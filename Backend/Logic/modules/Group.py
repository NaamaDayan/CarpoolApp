import json

from Data.db_manager import DBManager
from Logic.modules.Address import Address
from Logic.modules.dt import Datatype

MID_HOUR = '12:00'

db_manager = DBManager()
days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']


class Group(Datatype):

    def __init__(self, id, users, source, destination, daytime=None, schedule=None):
        super().__init__(id)
        self.users = users
        self.source = source  # location
        self.destination = destination  # location
        self.schedule = schedule #dict([(day, {"morning": -1, "evening": -1}) for day in self.days])
        self.daytime = daytime
        # self.exit_hour = exit_hour
        # self.day = day

    def extract_features(self):
        to_ret = []
        for day in days:
            exit_hour = self.schedule[day]
            to_ret.append([self.id, self.source['lat'], self.source['lng'], self.destination['lat'], self.destination['lng'], day, exit_hour])
        return to_ret

    def add_user(self, user):
        self.users.append(user)
        user_source, user_dest = (user.home_address, user.work_address['address']) if self.daytime == "morning" else (user.work_address['address'], user.home_address)
        self.source = user_source
        self.destination = user_dest
        # self.update_avg_location("source", user_source)
        # self.update_avg_location("destination", user_dest)

    def update_avg_location(self, direction, new_loc):
        n_users = len(self.users)
        updated_lat = (getattr(self, direction)['lat']*n_users + new_loc['lat']) / (n_users+1)
        updated_lng = (getattr(self, direction)['lng']*n_users + new_loc['lng']) / (n_users+1)
        setattr(self, direction, Address(lat=updated_lat, lng=updated_lng))

    def update_exit_hour(self, new_exit_hour):
        n_users = len(self.users)
        self.exit_hour = (self.exit_hour * n_users + new_exit_hour) / (n_users + 1)

    def __str__(self):
        return "id: {0}, users: {1}, source:{2}, dest: {3}, day: {4}, exit_hout: {5}".format(self.id, [i.id for i in self.users], self.source['address_name'], self.destination['address_name'], self.day, self.exit_hour)

    def get_data(self):
        dct = dict([(k, v) for k, v in self.__dict__.items() if k != 'id'])
        dct['users'] = [user.id for user in self.users]
        return dct

    def add_group(self):
        data = dict(self.get_data())
        return db_manager.add_group(self.id, data)

    def remove_user(self, user_id):
        self.users = list(filter(lambda user: user.id != user_id, self.users))
    #
    # def get_exit_hour(self, day):
    #     return self.schedule[day]


    # @staticmethod
    # def parse(id, args):
