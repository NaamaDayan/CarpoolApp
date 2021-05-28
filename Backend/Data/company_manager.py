import json

from API.apis.api_utils import APIUtils
from Data.collection_manager import CollectionManager


class CompanyManager(object):

    def __init__(self, db):
        self.comp_ref = db.collection('companies')
        self.companies = dict()
        self.update_companies()

    def update_companies(self):
        for comp in self.comp_ref.stream():
            self.companies[comp.id] = CollectionManager(self.comp_ref.document(comp.id), 'workplaces')

    def get_workplaces_collection(self, name):
        return self.companies[name]
        # return self.comp_ref.document(name).collection('workplaces')

    def get_workplaces(self, comp_name):
        try:
            company_workplaces = self.companies[comp_name]
            # all_workplaces = [APIUtils.get_dict(doc.to_dict()) for doc in company_workplaces.stream()]
            return company_workplaces.get_all()
        except Exception as e:
            return f"An Error Occurred: {e}"

    def set_workplace(self, comp_name, workplace):
        wid = workplace['id']
        workplace = dict([(key, val) for key, val in workplace.items() if key != 'id'])
        return self.companies[comp_name].set(wid, workplace)
