import json
import os
import sys

from firebase_admin import credentials, firestore, initialize_app

from Data.collection_manager import CollectionManager
from Data.group_manager import GroupManager
from Data.user_manager import UserManager
from Data.company_manager import CompanyManager

cwd = os.path.dirname(sys.modules['__main__'].__file__)
cred = credentials.Certificate(os.path.join(cwd, 'resources', 'carpool_key.json'))
default_app = initialize_app(cred)
db = firestore.client()


class DBManager(object):
    instance = None

    def __init__(self):
        self.um = UserManager(db)
        self.gm = GroupManager(db)
        self.cmpm = CompanyManager(db)
        self.cms = dict()

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Class ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @staticmethod
    def get_instance():
        if DBManager.instance is None:
            DBManager.instance = DBManager()
        return DBManager.instance

    def get_coll_manager(self, coll_name):
        if self.cms.get(coll_name) is None:
            self.cms[coll_name] = CollectionManager(db, coll_name)
        return self.cms[coll_name]

    # ~~~~~~~~~~~~~~~~~~~~~~~~~ Collection ~~~~~~~~~~~~~~~~~~~~~~~~~

    def get(self, coll_name, id):
        cm = self.get_coll_manager(coll_name)
        return cm.get(id) if id else cm.get_all()

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    def signup(self, id, user_data, ref):
        user_data['home_address'] = self.address_to_ref(user_data, 'home_address')
        user_data['work_address'] = ref
        print ("user data: ", user_data)
        return self.um.set(id, user_data)

    def update_user(self, id, attr_name, value):
        print (id, attr_name, value)
        return self.um.update(id, {attr_name: value})
    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Group ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

    def add_group(self, id, group_data):
        source, dest = 'source', 'destination'
        group_data[source] = self.address_to_ref(group_data, source)
        group_data[dest] = self.address_to_ref(group_data, dest)
        return self.gm.set(id, group_data)

    def get_groups(self):
        return self.gm.get_groups()

    def update_group(self, id, attr_name, value):
        return self.gm.update(id, {attr_name: value})

    def delete_group(self, id):
        deleteDoc = db.collection('groups').doc(id).delete()
        return deleteDoc

    def token(self, token):
        return self.um.token(token)

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~ Companies ~~~~~~~~~~~~~~~~~~~~~~~~~

    def get_workplaces(self, name):
        return self.cmpm.get_workplaces(name)

    def set_workplace(self, name, workplace_data):
        workplace_data['address'] = self.address_to_ref(workplace_data, 'address')
        return self.cmpm.set_workplace(name, workplace_data)

    # ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Utils ~~~~~~~~~~~~~~~~~~~~~~~~~~~

    @staticmethod
    def address_to_ref(json_data, field_name):
        address = json_data[field_name]
        cm = CollectionManager(db, 'addresses')
        address_id = address['place_id']
        cm.set(address_id, address)
        return cm.col_ref.document(address_id)

    @staticmethod
    def work_address_to_ref(json_data, field_name):
        company = json_data['company']
        address = json_data['work_address'][field_name]
        cm = CompanyManager(db).get_workplaces_collection(company)
        for doc in cm.find('workplace_name', address):
            return doc.reference

    @staticmethod
    def workplace_to_address(company, name):
        cm = CompanyManager(db).get_workplaces_collection(company)
        for doc in cm.find('workplace_name', name):
            json_dict = doc.to_dict()
            json_dict['address'] = json_dict['address'].get().to_dict()
            return doc.reference, json_dict
