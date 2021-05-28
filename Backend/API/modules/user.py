# import json
#
# from API.modules.dt import Datatype
#
#
# class User(Datatype):
#
#     def __init__(self, id=None, first_name=None, last_name=None,
#                  facebook_id=None, home_address=None, work_address=None,
#                  exit_hour1=None, exit_hour2=None, return_hour1=None,
#                  return_hour2=None, car_days=None):
#         super().__init__(id)
#         self.first_name = first_name
#         self.last_name = last_name
#         # self.facebook_id = facebook_id
#         self.home_address = home_address
#         self.work_address = work_address
#         self.exit_hour1 = exit_hour1
#         self.exit_hour2 = exit_hour2
#         self.return_hour1 = return_hour1
#         self.return_hour2 = return_hour2
#         self.car_days = car_days
#
#     @staticmethod
#     def columns():
#         return list(User().__dict__)
#
#     @staticmethod
#     def parse(args):
#         def get(name):
#             return args[name]
#         try:
#             return User(**dict([(x, get(x)) for x in User.columns()]))
#         except Exception:
#             pass
#             # raise InvalidParamsException()
