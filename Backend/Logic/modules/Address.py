from Logic.modules.dt import Datatype


class Address(Datatype):
    def __init__(self, id=None, address_name=None, lng=None, lat=None):
        super().__init__(id)
        self.address_name = address_name
        self.lng = lng
        self.lat = lat

    def __str__(self):
        return "name: {0}, lng: {1}, lat: {2}".format(self.address_name, self.lng, self.lat)