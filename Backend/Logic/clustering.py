import json

import pandas as pd
import googlemaps
import numpy as np

from Data.db_manager import DBManager
from Logic.Utils import parse_group, calc_time_difference, compare_times, days
from Logic.authentication import Authentication
from Logic.modules.Group import Group

API_KEY = 'AIzaSyBvnlFZBDLHbifQYB3ZABr1c-qU8klKFyk'

db_manager = DBManager()

groups = None
new_groups = []
gmaps = googlemaps.Client(key=API_KEY)


def get_group(id, user, add_user=False):
    for group in groups:
        if group.id == str(id):
            if add_user and user.email not in map(lambda u: u.id, group.users):
                group.add_user(user)
            return group
    return None


def create_group(user, day, daytime, time):
    schedule = dict([(day, '') for day in days])
    schedule[day] = time
    if daytime == 'morning':
        group = Group(Authentication.generate_id(), [user], user.home_address, user.work_address['address'], "morning",
                      schedule)
    else:
        group = Group(Authentication.generate_id(), [user], user.work_address['address'], user.home_address, "evening",
                      schedule)
    groups.append(group)
    return group


def filter_to_relevant_day_and_time(groups_df, day, isMorning):
    def pred(group):
        daytime = "morning" if isMorning else "evening"
        return group.schedule[day] != -1 and group.daytime == daytime
        # return daytime_exists and (compare_times('12:00', group.schedule[day]) if isMorning else
        #                            compare_times(group.schedule[day], '12:00'))

    relevant_groups_ids = list(map(lambda g: g.id, filter(pred, groups)))
    relevant_groups_ids = np.intersect1d(relevant_groups_ids, groups_df.index)
    return groups_df.loc[relevant_groups_ids]


def find_group_by_daytime(user, day, schedule, groups_df, max_timing_diff, daytime):
    if user.group_schedule[day][daytime] == -1:  # only if the user does not already have a group
        is_morning = daytime == "morning"
        direction = "exit" if is_morning else "return"
        relevant_groups_df = filter_to_relevant_day_and_time(groups_df, day, isMorning=is_morning)
        relevant_groups_df[daytime + '_score'] = groups_by_time_score(relevant_groups_df['exit_hour'],
                                                                      schedule["avg_" + direction + "_hour"],
                                                                      max_timing_diff)
        user.group_schedule[day][daytime] = get_best_group(
            relevant_groups_df[['source_score', 'dest_score', daytime + '_score', 'day', 'exit_hour']], user, day,
            daytime,
            time=schedule["avg_exit_hour"])


def find_group(user, for_morning, for_evening, max_driving_duration=300, max_timing_diff=1800):
    global groups
    ggs = json.loads(db_manager.get_groups()[0])

    groups = list(filter(lambda group: len(group.users) < 5, [parse_group(id, data) for id, data in ggs.items()]))
    if for_morning:
        groups_df_morning = calc_groups_location_score(user, max_driving_duration, groups, is_morning=True)
        for day, schedule in user.schedule.items():
            find_group_by_daytime(user, day, schedule, groups_df_morning, max_timing_diff, "morning")
    if for_evening:
        groups_df_evening = calc_groups_location_score(user, max_driving_duration, groups, is_morning=False)
        for day, schedule in user.schedule.items():
            find_group_by_daytime(user, day, schedule, groups_df_evening, max_timing_diff, "evening")
    return groups


def calc_groups_location_score(user, threshold, groups, is_morning):
    flatten = lambda l: [item for sublist in l for item in sublist]
    groups_locations = flatten([group.extract_features() for group in groups])
    groups_df = pd.DataFrame(groups_locations,
                             columns=['id', 'source_lat', 'source_lng', 'dest_lat', 'dest_lng', 'day',
                                      'exit_hour']).set_index('id')
    user_source, user_dest = (user.extract_home_locations(), user.extract_work_locations()) if is_morning else (
        user.extract_work_locations(), user.extract_home_locations())
    groups_df['source_score'] = groups_by_location_score(groups_df[['source_lat', 'source_lng']], user_source,
                                                         threshold)
    groups_df['dest_score'] = groups_by_location_score(groups_df[['dest_lat', 'dest_lng']], user_dest, threshold)
    return groups_df


def handle_group_schedule(location_score, user, day, daytime, time):
    if location_score.shape[0] != 0 or (new_groups and len(new_groups) > 0):
        relevant_groups = list(
            map(lambda group_id: get_group(group_id, user, add_user=False), location_score.index)) + new_groups
        for group in relevant_groups:
            if group.schedule[day] == -1 and group.daytime == daytime:  # no group at this time
                group.schedule[day] = time
                return group.id
    new_group = create_group(user, day, daytime, time)
    new_groups.append(new_group)
    return new_group.id


def get_best_group(group_scores, user, day, daytime, time):
    group_scores_all = group_scores[(group_scores.T != -1).all()]
    if group_scores_all.shape[0] == 0:
        location_score = group_scores[["source_score", "dest_score"]]  # filter only by location
        location_score = location_score[(location_score.T != -1).all()]
        return handle_group_schedule(location_score, user, day, daytime, time)
    group_scores_all = group_scores_all[group_scores_all['day'] == day]
    normalized_scores = normalize_scores(group_scores_all)
    best_group_index = normalized_scores.sum(axis=1).sort_values().index[-1]
    best_group = get_group(best_group_index, user, add_user=True)
    return best_group.id


def groups_by_time_score(groups_timing, avg_exit_hour, max_timing_diff):
    groups_timing_score = list()
    for index in set(groups_timing.index):
        for i in range(groups_timing.loc[index].shape[0]):
            groups_timing_score.append((index, calc_time_difference(groups_timing.loc[index].iloc[i], avg_exit_hour)))
    return [g[1] if g[1] <= max_timing_diff else -1 for g in groups_timing_score]


def groups_by_location_score(groups_location_df, user_location, threshold):
    groups_source_scores = list(
        map(lambda index: (
            index, calc_duration(tuple(groups_location_df.loc[index].values[0]), user_location, threshold)),
            groups_location_df.index))
    return [g[1] if g[1] <= threshold else -1 for g in groups_source_scores]


def calc_duration(loc1, loc2, threshold):
    if abs(loc1[0] - loc2[0]) <= 0.02 and abs(loc1[1] - loc2[1]) <= 0.02:
        directions_result = gmaps.directions(loc1, loc2, mode="driving")  # departure_time=now)
        x = directions_result[0]['legs'][0]['duration']['value']
        return x  # duration in seconds
    return threshold + 1
    # loc1 = (cut_last_digits(loc1[0]), cut_last_digits(loc1[1]))
    # loc2 = (cut_last_digits(loc2[0]), cut_last_digits(loc2[1]))


# do not normalize rows with all zeros
def normalize_scores(df):
    df = df.drop(['day', 'exit_hour'], axis=1)
    zeros_columns = df.columns[(df == 0).all()]
    df_non_zeros = df.drop(zeros_columns, axis=1)
    new_df = df_non_zeros.div(df_non_zeros.sum(axis=0), axis=1)
    for col in zeros_columns:
        new_df[col] = np.zeros(new_df.shape[0])
    return new_df


def cut_last_digits(number):
    return float(str(number)[:str(number).index(".") + 6])
