import json

from Data.db_manager import DBManager
from Logic import clustering, Utils
from Logic.modules.dt import Datatype

#
# class Schedule(Enum):
#     AVG_EXIT_HOUR = 1
#     AVG_RETURN_HOUR = 2


db_manager = DBManager()


class User(Datatype):

    def __init__(self, id=None, email=None, company=None, first_name=None, last_name=None,
                 facebook_id=None, work_address=None, home_address=None,
                 car_days=None, token_id=None, temp_group_id=None, schedule=None, group_schedule=None):
        super().__init__(id)
        self.company = company
        self.email = email
        self.first_name = first_name
        self.last_name = last_name
        self.facebook_id = facebook_id
        self.home_address = home_address  # Address
        self.work_address = work_address  # Work_place
        self.schedule = schedule  # dict([(day, {Schedule.AVG_EXIT_HOUR: '08:00', Schedule.AVG_RETURN_HOUR: '17:00'}) for day in Days])
        self.group_schedule = group_schedule
        self.car_days = car_days
        self.temp_group_id = temp_group_id
        self.token_id = token_id

    def extract_home_locations(self):
        return self.home_address['lat'], self.home_address['lng']

    def extract_work_locations(self):
        return self.work_address['address']['lat'], self.work_address['address']['lng']

    def __str__(self):
        return "home: {0}\nwork:{1}\nschedule: {2}\ngroup_schedule: {3}\n". \
            format(self.home_address, self.work_address, self.schedule, self.group_schedule)

    def signup(self):  # , token_id):
        work_ref, self.work_address = db_manager.workplace_to_address(self.company, self.work_address)
        data = dict(self.get_data())  # , **{'token_id': token_id})
        return db_manager.signup(self.id, data, work_ref)

    def find_group(self, for_morning, for_evening):
        groups = clustering.find_group(self, for_morning, for_evening)
        self.temp_group_id = self.group_schedule["Sunday"]["morning"]  # to_remove_later
        for group in groups:
            group.add_group()

    # returns the group_schedule json, filled with the groups json
    def get_groups(self):
        if self.has_some_group():
            group_schedule = dict([(day, {"morning": -1, "evening": -1}) for day in self.group_schedule.keys()])
            for day, morning_evening in self.group_schedule.items():
                group_schedule[day]["morning"] = Utils.get_group_with_users(morning_evening["morning"])
                group_schedule[day]["evening"] = Utils.get_group_with_users(morning_evening["evening"])
            return group_schedule
        return None

    # returns the group that is common to most days in the given daytime (morning or evening)
    def get_common_group(self, daytime):
        groups_ids = [self.group_schedule[day][daytime] for day in self.group_schedule.keys()]
        most_common_group_id = Utils.most_frequent(groups_ids)
        return {"group_id": most_common_group_id, "group": Utils.get_group_with_users(most_common_group_id)}

    def has_some_group(self):
        for day in self.group_schedule.keys():
            if self.group_schedule[day]["morning"] != -1 or self.group_schedule[day]["evening"] != -1:
                return True
        return False

    def remove_from_group(self, group_id):
        group = json.loads(db_manager.get("groups", group_id))
        group_obj = Utils.parse_group(group_id, group)
        group_obj.remove_user(self.id)
        if len(group_obj.users) == 0:
            db_manager.delete_group(group_id)
        else:
            group_obj.add_group()

        # remove group id from group schedule:
        def remove_from_daytime(day, daytime):
            if self.group_schedule[day][daytime] == group_id:
                self.group_schedule[day][daytime] = -1

        for day in self.group_schedule.keys():
            remove_from_daytime(day, "morning")
            remove_from_daytime(day, "evening")

    @staticmethod
    def columns():
        return [x for x in list(User().__dict__) if x != 'id']
