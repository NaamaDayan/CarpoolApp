from google.cloud.firestore_v1 import DocumentReference

# from apis.company_api import CompanyAPI


class APIUtils(object):
    ROOT = DASH = '/'
    VERSION = 'v1'
    RESOURCES = 'resources'
    NOT_FOUND = 404
    SUCCESS = 200

    instance = None

    def __init__(self, db):
        self.db = db
        self.version_add = APIUtils.join(APIUtils.ROOT, APIUtils.VERSION)
        self.resources_add = APIUtils.join(self.version_add, self.RESOURCES)
        self.collections = dict()
        self.init_collections()

    def __getitem__(self, item):
        return APIUtils.join(self.resources_add, item)

    @staticmethod
    def get_instance(db):
        if APIUtils.instance is None:
            APIUtils.instance = APIUtils(db)
        return APIUtils.instance

    def init_collections(self):
        for col in self.db.collections():
            self.collections[col.id] = APIUtils.join(self.resources_add, col.id)

        # for company in CompanyAPI(self.db, self).companies:
        #     self.collections[company] = APIUtils.join(self.resources_add, 'companies', company)
        # print(self.collections)

    @staticmethod
    def parse_data(data):
        return ','.join(['{}={}'.format(key, val) for key, val in data.items()])

    @staticmethod
    def get_dict(doc):
        if type(doc) == dict:
            for key, val in doc.items():
                if type(val) == DocumentReference:
                    doc[key] = APIUtils.get_dict(val.get().to_dict())

        return doc

    @staticmethod
    def join(d, *ds):
        if not ds:
            return d
        if d == APIUtils.ROOT:
            return '{}{}'.format(d, APIUtils.join(*ds))
        return APIUtils.DASH.join([d] + list(ds))



