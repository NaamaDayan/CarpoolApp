import json

from API.apis.api_utils import APIUtils
from Data.db_manager import DBManager
from Data.group_manager import GroupManager

from Logic import clustering, Utils
from Logic.Utils import parse_user_from_client, parse_user_from_db
from Logic.clustering import calc_duration

db_manager = DBManager.get_instance()


class LogicFacade(object):

    # ~~~~~~~~~~~~~~~~~~~~~~~~~ Collection ~~~~~~~~~~~~~~~~~~~~~~~~~

    @staticmethod
    def get(collection, id):
        return db_manager.get(collection, id)

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @staticmethod
    def get_user_data(id):
        user_data = json.loads(LogicFacade.get('users', id))
        user_obj = parse_user_from_db(id, user_data)
        group_schedule = user_obj.get_groups()
        print (group_schedule)
        res = {
            'user': user_data,
            'group_schedule': group_schedule  # None if user has no groups
        }
        res = json.dumps(res)
        return res

    @staticmethod
    def signup(values):
        # UserAuthentication.generate_id()
        id = values['email']
        print(id, values)
        user = Utils.parse_user_from_client(id, values)
        # token_id = str(TokenManager.generate_token(user.id))
        res = user.signup()
        res = dict(json.loads(res))  # , **{'token_id': token_id})
        return json.dumps(res)

    # @staticmethod
    # def login(cls, values):
    #     pas

    @staticmethod
    def token(token):
        return db_manager.token(token)

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Group ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @staticmethod
    def find_groups(email, for_morning, for_evening):
        # try:
        for_morning = True if for_morning == 'true' else False
        for_evening = True if for_evening == 'true' else False
        user = db_manager.get('users', email)
        user_obj = parse_user_from_db(email, json.loads(user))
        user_obj.find_group(for_morning, for_evening)
        db_manager.update_user(email, 'group_schedule', user_obj.group_schedule)
        groups_schedule = user_obj.get_groups()

        morning_group = user_obj.get_common_group("morning") if for_morning else None
        evening_group = user_obj.get_common_group("evening") if for_evening else None
        user_schedule = user_obj.group_schedule
        return json.dumps({"group_schedule": groups_schedule,
                           "morning_group": morning_group,
                           "evening_group": evening_group,
                           "user_schedule": user_schedule})
        # except Exception as e:
        #     print("error: ", e)
        #     return str(e)

    @staticmethod
    def remove_from_group(email, group_id):
        user = db_manager.get('users', email)
        user_obj = parse_user_from_db(email, json.loads(user))
        user_obj.remove_from_group(group_id)
        db_manager.update_user(email, 'group_schedule', user_obj.group_schedule)
        group_schedule = user_obj.get_groups()
        user_schedule =user_obj.group_schedule
        return json.dumps({"group_schedule": group_schedule, "user_schedule": user_schedule})

    @staticmethod
    def find_real_time_groups(group_constrains):
        driving_distance_threshold = 300
        exit_hour1, exit_hour2, source, destination, day = \
            group_constrains['exit_hour1'], group_constrains['exit_hour2'], \
            group_constrains['source'], group_constrains['destination'], group_constrains['day']
        print (exit_hour1, exit_hour2, source, destination, day)
        relevant_groups = db_manager.gm.find_by_params(exit_hour1, exit_hour2, day)
        suggestions = []
        for doc in relevant_groups:
            group = APIUtils.get_dict(doc.to_dict())
            source_diff = calc_duration((source['lat'], source['lng']),
                                        (group['source']['lat'], group['source']['lng']),
                                        threshold=driving_distance_threshold)
            print (source_diff, "source diff")
            if source_diff < driving_distance_threshold:
                dest_diff = calc_duration((destination['lat'], destination['lng']),
                                          (group['destination']['lat'], group['destination']['lng']),
                                          threshold=300)
                print (dest_diff, "dest diff")
                if dest_diff < driving_distance_threshold:
                    group['users'] = list(
                        map(lambda user_email: json.loads(db_manager.get('users', user_email)), group['users']))
                    suggestions.append(group)
        return json.dumps(suggestions)

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~ Companies ~~~~~~~~~~~~~~~~~~~~~~~~~

    @staticmethod
    def get_workplaces(name):
        return db_manager.get_workplaces(name)

    @staticmethod
    def set_workplaces(name, workplace_data):
        return db_manager.set_workplace(name, workplace_data)
