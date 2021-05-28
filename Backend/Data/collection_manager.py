import json

from API.apis.api_utils import APIUtils


class CollectionManager(object):

    def __init__(self, db, collection_name):
        self.db = db
        self.col_ref = db.collection(collection_name)

    def get_all(self):
        try:
            all_docs = [APIUtils.get_dict(doc.to_dict()) for doc in self.col_ref.stream()]
            return json.dumps(all_docs)
        except Exception as e:
            return f"An Error Occurred: {e}"

    def get(self, doc_id):
        try:
            doc = self.col_ref.document(doc_id).get()
            return json.dumps(APIUtils.get_dict(doc.to_dict()))
        except Exception as e:
            return f"An Error Occurred: {e}"

    def find(self, field_name, field_value, operator='=='):
        data = self.col_ref.where(field_name, operator, field_value)
        return data.get()

    def set(self, id, data):
        try:
            self.col_ref.document(id).set(data)
            return json.dumps({"success": True})
        except Exception as e:
            return f"An Error Occurred: {e}"

    def update(self, id, dct):
        return self.col_ref.document(id).update(dct)
