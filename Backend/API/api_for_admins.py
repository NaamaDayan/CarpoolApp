# import json
# import os
# import flask
# from flask import request
# from firebase_admin import credentials, firestore, initialize_app
#
# from Data.address_manager import AddressManager
# from API.apis.api_utils import APIUtils
# from Data.company_api import CompanyAPI
# from Data.user_manager import UserManager
# from API.modules.user import User
#
# app = flask.Flask(__name__)
# cwd = os.path.dirname(os.path.realpath(__file__))
# cred = credentials.Certificate('{}\\{}'.format(cwd, 'carpool_key.json'))
# default_app = initialize_app(cred)
# db = firestore.client()
#
# utils = APIUtils.get_instance(db)
# user_api = UserManager(db)
# addresses_api = AddressManager(db)
# company_api = CompanyAPI(db)
#
#
# class Server(object):
#
#     def __init__(self, host, port):
#         app.config["DEBUG"] = True
#         self.host = host
#         self.port = port
#
#     def run(self):
#         app.run(host=self.host, port=self.port)
#
#
# @app.route(utils.ROOT, methods=['GET'])
# def home():
#     return '''<h1>Carpool API and utilities</h1>
# <p>An API for Jestap</p>'''
#
#
# @app.errorhandler(utils.NOT_FOUND)
# def page_not_found(e):
#     return "<h1>404</h1><p>The resource could not be found.</p>", 404
#
#
# @app.route(utils['users'], methods=['GET'])
# def users_get():
#     request_params = request.args
#     uid = request_params.get('id')
#     return user_api.get_all() if uid is None else user_api.get(uid)
#
#
# @app.route(utils['users'], methods=['POST', 'PUT'])
# def signup():
#     values = json.loads(request.get_data().decode('utf-8'))
#     user = User.parse(values)
#     return user_api.set(user)
#
#
# @app.route(APIUtils.join(utils['companies'], '<name>'), methods=['GET'])
# def workplaces_get(name):
#     return company_api.get_workplaces(name)
#
#
# def main():
#     server = Server(host='0.0.0.0', port='5000')
#     server.run()
#
#
# if __name__ == '__main__':
#     main()
