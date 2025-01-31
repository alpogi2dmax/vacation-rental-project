#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Rental, Booking, datetime


# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):

    def get(self):

        users = [users.to_dict(rules=('rentals',)) for users in User.query.all()]
        return users, 200

    def post(self):
        try:
            data = request.get_json()
            user = User(
                username = data['username'],
                email = data['email'],
                first_name = data['first_name'],
                last_name = data['last_name'],
                profile_pic = data['profile_pic']
            )
            user.password_hash = data['password']
            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict()
            return make_response(user_dict, 201)
        except:
            response_body = {'errors': ['validation errors']}
            return response_body, 400

api.add_resource(Users,'/users')



if __name__ == '__main__':
    app.run(port=5555, debug=True)

