from datetime import datetime


class TokenManager(object):

    @staticmethod
    def generate_token(id):
        time_now = datetime.now().timestamp()
        hashed_time = hash(time_now)
        return abs(hash(id + str(hashed_time)))


class Authentication(object):

    @staticmethod
    def generate_id():
        return str(datetime.now().timestamp())
