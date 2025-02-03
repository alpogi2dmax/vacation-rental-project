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

        users = [users.to_dict() for users in User.query.all()]
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

class UsersByID(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            user_dict = user.to_dict()
            return user_dict, 200
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.get_json()
        if user:
            for attr, value, in data.items():
                setattr(user, attr, value)
            db.session.add(user)
            db.session.commit()
            user_dict = user.to_dict()
            return user_dict, 202
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            response_body = ''
            return response_body, 204
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404

api.add_resource(UsersByID,'/users/<int:id>')

class Rentals(Resource):

    def get(self):
        rentals = [rental.to_dict() for rental in Rental.query.all()]
        return rentals, 200
    
api.add_resource(Rentals, '/rentals')


if __name__ == '__main__':
    app.run(port=5555, debug=True)

