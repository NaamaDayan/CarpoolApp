import json

from API.apis.api_utils import APIUtils
from Data.collection_manager import CollectionManager


class UserManager(CollectionManager):

    def __init__(self, db):
        super().__init__(db, 'users')

    def token(self, token):
        h = list(self.find('token_id', str(token)))
        for doc in h:
            return APIUtils.get_dict(doc.to_dict())
        return ''






