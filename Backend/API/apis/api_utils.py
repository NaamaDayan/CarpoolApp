from google.cloud.firestore_v1 import DocumentReference


# from apis.company_api import CompanyAPI


class APIUtils(object):
    ROOT = DASH = '/'
    VERSION = 'v1'
    RESOURCES = 'resources'
    ACTIONS = 'actions'
    ERROR = '<h1>404</h1><p>The resource could not be found:</p>'
    NOT_FOUND = 404
    SUCCESS = 200

    instance = None

    def __init__(self):
        self.version_add = APIUtils.join(APIUtils.ROOT, APIUtils.VERSION)
        self.resources_add = APIUtils.join(self.version_add, self.RESOURCES)
        self.actions_add = APIUtils.join(self.version_add, self.ACTIONS)

    def __getitem__(self, item):
        return APIUtils.join(self.resources_add, '<{}>'.format(item))

    def resource(self, name, *subs):
        if subs:
            name = APIUtils.join(name, *subs)
        return APIUtils.join(self.resources_add, '{}'.format(name))

    def action(self, name):
        return APIUtils.join(self.actions_add, '{}'.format(name))

    @staticmethod
    def get_instance():
        if APIUtils.instance is None:
            APIUtils.instance = APIUtils()
        return APIUtils.instance

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
