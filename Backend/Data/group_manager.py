from Data.collection_manager import CollectionManager
from API.apis.api_utils import APIUtils
import json


class GroupManager(CollectionManager):

    def __init__(self, db):
        super().__init__(db, 'groups')
        self.group_ref = db.collection('groups')
        self.days = {"0": "Sunday", "1": "Monday", "2": "Tuesday", "3": "Wednesday", "4": "Thursday", "5": "Friday",
                     "6": "Saturday"}

    def get_groups(self):
        try:
            all_docs = [(doc.id, APIUtils.get_dict(doc.to_dict())) for doc in self.col_ref.stream()]
            return json.dumps(dict(all_docs)), APIUtils.SUCCESS
        except Exception as e:
            return f"An Error Occurred: {e}"

    def find_by_params(self, min_hour, max_hour, day):
        print(self.days[str(day)])
        data = self.group_ref.where("schedule." + self.days[str(day)], "<=", max_hour).\
            where("schedule." + self.days[str(day)], ">=", min_hour)
        return data.get()
