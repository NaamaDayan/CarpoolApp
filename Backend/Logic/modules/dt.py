import json


class Datatype(object):

    def __init__(self, id):
        self.id = id

    def get_data(self):
        def helper(v):
            return v if type(v) != Datatype else v.get_data()

        return dict([(k, helper(v)) for k, v in self.__dict__.items() if k != 'id'])

    # @staticmethod
    # def columns():
    #     return list(Datatype().__dict__)
    #
    # @staticmethod
    # def parse(id, args):
    #     def get(name):
    #         return args[name]
    #     try:
    #         return Datatype(**dict([(x, get(x)) for x in Datatype.columns()]))
    #     except Exception:
    #         pass
