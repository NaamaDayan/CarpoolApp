from API.modules.dt import Datatype


class WorkPlaceAddress(Datatype):

    def __init__(self, id=None, address_name=None, address=None):
        super().__init__(id)
        self.workplace_name = address_name
        self.address = address

