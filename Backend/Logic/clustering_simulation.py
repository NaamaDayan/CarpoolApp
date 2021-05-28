# import pandas as pd
#
# from Logic.modules.Address import Address
# from Logic.modules.User import User, Schedule
# from Logic.clustering import find_group, groups
# from Logic.modules.Schedule import Days
#
# data = pd.read_csv('../../people_partial.csv')
#
#
# def create_users():
#     users = []
#     for i, row in data.iterrows():
#         user = User(id=i,
#                     # home_address=Address(address_name=row['Home'], lat=row['Home_lat'], lng=row['Home_lng']),
#                     # work_address=Address(address_name=row['Work'], lat=row['Work_lat'], lng=row['Work_lng']),
#                     # schedule=dict([(day, {Schedule.AVG_EXIT_HOUR: row['Go1'], Schedule.AVG_RETURN_HOUR: row['Back1']}) for day in Days])
#                     )
#         users.append(user)
#     return users
#
#
# if __name__ == '__main__':
#     users = create_users()
#     for user in users[:6]:
#         find_group(user)
#         print (user)
#     # users = [user.__dict__ for user in users]
#     for group in groups:
#         print (group.__str__())
#         print ("**********")
