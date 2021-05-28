import json

from Data.db_manager import DBManager
from Logic.modules.Group import Group
from datetime import datetime, timedelta

from Logic.modules.user import User
from collections import Counter

db_manager = DBManager.get_instance()

days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


def parse_user_from_client(id, args):
    try:
        exit_hour1, exit_hour2, return_hour1, return_hour2 = \
            args['exit_hour1'], args['exit_hour2'], args['return_hour1'], args['return_hour2']
        hours_keys = ['exit_hour1', 'exit_hour2', 'return_hour1', 'return_hour2']
        dict_to = dict([(x, args[x]) for x in args.keys() if x not in hours_keys])
        user = User(id=id, **dict_to)
        exit_hour = avg_hours(exit_hour1, exit_hour2)
        ret_hour = avg_hours(return_hour1, return_hour2)
        user.schedule = dict(
            [(day, {"avg_exit_hour": exit_hour, "avg_return_hour": ret_hour}) for day in days])
        user.group_schedule = dict([(day, {"morning": -1, "evening": -1}) for day in days])
        return user
    except Exception as e:
        raise e


def parse_user_from_db(id, args):
    try:
        dict_to = dict([(x, args[x]) for x in args.keys()])
        user = User(id=id, **dict_to)
        return user
    except Exception as e:
        raise e


def avg_hours(time1, time2):
    time1, time2 = datetime.strptime(time1, '%H:%M'), datetime.strptime(time2, '%H:%M')
    seconds = time1.time().hour * 3600 + time1.time().minute * 60 + \
              time2.time().hour * 3600 + time2.time().minute * 60
    return str(timedelta(seconds=seconds / 2))[:-3]


def calc_time_difference(time1, time2):
    return (datetime.strptime(time1, '%H:%M') - datetime.strptime(time2, '%H:%M')).seconds


def compare_times(time1, time2):
    time1, time2 = datetime.strptime(time1, '%H:%M'), datetime.strptime(time2, '%H:%M')
    seconds = time1.time().hour * 3600 + time1.time().minute * 60 - \
              time2.time().hour * 3600 + time2.time().minute * 60
    return seconds > 0


def parse_group(id, args):
    def get(name):
        if name != "users":
            return args[name]
        users = list()
        for user_id in args[name]:
            user_json = json.loads(db_manager.get('users', user_id))
            user = parse_user_from_db(user_id, user_json)
            users.append(user)
        return users

    try:
        return Group(id=id, **dict([(x, get(x)) for x in args.keys()]))
    except Exception as e:
        raise e

    # raise InvalidParamsException()


def get_group_users(group_json):
    def json_to_data(user_json):
        return {
            'email': user_json['email'],
            'first_name': user_json['first_name'],
            'last_name': user_json['last_name']
        }

    users = map(lambda user_email:
                json.loads(db_manager.get('users', user_email)), group_json['users'])
    users = list(map(json_to_data, users))
    return users


def get_group_with_users(id):
    if id != -1:
        group = json.loads(db_manager.get('groups', id))
        group['users'] = get_group_users(group)
    else:
        group = -1
    return group


def most_frequent(lst):
    occurence_count = Counter(lst)
    return occurence_count.most_common(1)[0][0]
