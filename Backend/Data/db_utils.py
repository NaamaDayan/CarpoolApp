import struct


class DBUtils(object):

    @staticmethod
    def enc_coords(lat, lng):
        lat = struct.pack('>ff', lat, lng)
        lat = struct.unpack('>q', lat)[0]
        return lat

    @staticmethod
    def get_coords(cypher):
        cypher = struct.pack('>q', cypher)
        return struct.unpack('>ff', cypher)

