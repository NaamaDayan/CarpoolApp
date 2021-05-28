import json
import flask
from flask import request

from API.apis.api_utils import APIUtils
from Logic.logic_facade import LogicFacade

app = flask.Flask(__name__)
utils = APIUtils.get_instance()


class Server(object):

    def __init__(self, host, port):
        app.config["DEBUG"] = True
        self.host = host
        self.port = port

    def run(self):
        app.run(host=self.host, port=self.port)


@app.route(utils.ROOT, methods=['GET'])
def home():
    return '''<h1>Carpool API and utilities</h1>
<p>An API for Jestap</p>''', APIUtils.SUCCESS


@app.errorhandler(utils.NOT_FOUND)
def page_not_found(e):
    return (APIUtils.ERROR + " {}").format(e), APIUtils.NOT_FOUND


# ~~~~~~~~~~~~~~~~~~~~~~~~~ Collection ~~~~~~~~~~~~~~~~~~~~~~~~~


@app.route(utils['col_name'], methods=['GET'])
def collection_get(col_name):
    # if col_name == 'users':
    #     return
    print('in collection_Get')
    request_params = request.args
    id = request_params.get('id')
    company = request_params.get('company')
    if company is not None:
        return LogicFacade.get_workplaces(company)
    return LogicFacade.get(col_name, id), APIUtils.SUCCESS


# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ User ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

@app.route(utils.resource('users'), methods=['GET'])
def get_user_data():
    print('in user_get')
    request_params = request.args
    id = request_params.get('id')
    res = LogicFacade.get_user_data(id)
    return res, APIUtils.SUCCESS


@app.route(utils.resource('users', 'signup'), methods=['POST', 'PUT'])
def signup():
    vals = request.get_data().decode('utf-8')
    # if type(vals) == str:
    #     vals = json.loads(vals)
    print (vals, type(vals))
    values = json.loads(vals)
    res = LogicFacade.signup(values)
    return res, APIUtils.SUCCESS


# @app.route(utils.resource('users', 'login'), methods=['POST', 'PUT'])
# def login():
#     values = json.loads(request.get_data().decode('utf-8'))
# return LogicFacade.login(values)


@app.route(utils.resource('users', 'token'), methods=['POST', 'PUT'])
def token():
    values = json.loads(request.get_data().decode('utf-8'))
    values = values['token_id']
    token_res = LogicFacade.token(values)
    return json.dumps({'response': token_res}), APIUtils.SUCCESS  # if token_res else APIUtils.NOT_FOUND


# ~~~~~~~~~~~~~~~~~~~~~~~~~~ Groups ~~~~~~~~~~~~~~~~~~~~~~~~~
@app.route(utils.action('find_groups'), methods=['GET'])
def find_groups():
    request_params = request.args
    email = request_params.get('email')
    for_morning = request_params.get('morning')
    for_evening = request_params.get('evening')
    return LogicFacade.find_groups(email, for_morning, for_evening), APIUtils.SUCCESS


@app.route(utils.action('remove_from_group'), methods=['GET'])
def remove_from_group():
    request_params = request.args
    email = request_params.get('email')
    group_id = request_params.get('group_id')

    return LogicFacade.remove_from_group(email, group_id), APIUtils.SUCCESS


@app.route(utils.action('find_real_time_groups'), methods=['POST'])
def find_real_time_groups():
    group_constrains = json.loads(request.get_data().decode('utf-8'))
    res = LogicFacade.find_real_time_groups(group_constrains)
    return res, APIUtils.SUCCESS


# ~~~~~~~~~~~~~~~~~~~~~~~~~~ Companies ~~~~~~~~~~~~~~~~~~~~~~~~~


@app.route(APIUtils.join(utils['companies'], '<name>'), methods=['GET'])
def workplaces_get(companies, name):
    if name is None:
        return
    if companies == 'companies':
        return LogicFacade.get_workplaces(name), APIUtils.SUCCESS
    return APIUtils.ERROR, APIUtils.NOT_FOUND


@app.route(utils.resource('companies', '<name>'), methods=['POST', 'PUT'])
def workplaces_set(companies, name):
    values = json.loads(request.get_data().decode('utf-8'))
    if companies == 'companies':
        return LogicFacade.set_workplaces(name, values), APIUtils.SUCCESS
    return APIUtils.ERROR, APIUtils.NOT_FOUND


def main():
    server = Server(host='0.0.0.0', port='5000')
    server.run()


if __name__ == '__main__':
    main()
