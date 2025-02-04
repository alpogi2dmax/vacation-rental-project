#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Rental, Booking, Review, datetime


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
    
    def post(self):
        try:
            data = request.get_json()
            rental = Rental(
                name = data['name'],
                address = data['address'],
                city = data['city'],
                state = data['state'],
                daily_rate = data['daily_rate'],
                description = data['description'],
                cover_pic = data['cover_pic'],
                owner_id = data['owner_id']
            )
            db.session.add(rental)
            db.session.commit()
            rental_dict = rental.to_dict()
            return make_response(rental_dict, 201)
        except:
            response_body = {'errors': ['validation errors']}
            return response_body, 400
    
api.add_resource(Rentals, '/rentals')

class RentalsByID(Resource):

    def get(self, id):
        rental = Rental.query.filter_by(id=id).first()
        if rental:
            rental_dict = rental.to_dict()
            return rental_dict, 200
        else:
            response_body = {"error": "Rental not found"}
            return response_body, 404
        
    def patch(self, id):
        rental = Rental.query.filter_by(id=id).first()
        data = request.get_json()
        if rental:
            for attr, value, in data.items():
                setattr(rental, attr, value)
            db.session.add(rental)
            db.session.commit()
            rental_dict = rental.to_dict()
            return rental_dict, 202
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
    def delete(self, id):
        rental = Rental.query.filter_by(id=id).first()
        if rental:
            db.session.delete(rental)
            db.session.commit()
            response_body = ''
            return response_body, 204
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404

api.add_resource(RentalsByID, '/rentals/<int:id>')

class Bookings(Resource):

    def get(self):
        bookings = [booking.to_dict() for booking in Booking.query.all()]
        return bookings, 200
    
    def post(self):
        try:

            data = request.get_json()

            start = datetime.strptime(data['start_date'], '%m/%d/%Y')
            end = datetime.strptime(data['end_date'], '%m/%d/%Y')

            booking = Booking(
                name = data['name'],
                start_date = start,
                end_date = end,
                traveler_id = data['traveler_id'],
                rental_id = data['rental_id']
            )
            db.session.add(booking)
            db.session.commit()
            booking_dict = booking.to_dict()
            return make_response(booking_dict, 201)
        except Exception as e:
            print(e)
            response_body = {'errors': ['validation errors']}
            return response_body, 400
    
api.add_resource(Bookings, '/bookings')

class BookingsByID(Resource):

    def get(self, id):
        booking = Booking.query.filter_by(id=id).first()
        if booking:
            booking_dict = booking.to_dict()
            return booking_dict, 200
        else:
            response_body = {"error": "Rental not found"}
            return response_body, 404
        
    def patch(self, id):
        booking = Booking.query.filter_by(id=id).first()
        data = request.get_json()
        if booking:
            try:
                # Convert start_date and end_date to datetime objects if they are included in the request
                if 'start_date' in data:
                    data['start_date'] = datetime.strptime(data['start_date'], '%m/%d/%Y')
                if 'end_date' in data:
                    data['end_date'] = datetime.strptime(data['end_date'], '%m/%d/%Y')
                for attr, value, in data.items():
                    setattr(booking, attr, value)
                db.session.add(booking)
                db.session.commit()
                booking_dict = booking.to_dict()
                return booking_dict, 202
            except ValueError as e:
                response_body = {'error': 'Invalid date format. Please use MM/DD/YYYY.'}
                return response_body, 400
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
    def delete(self, id):
        booking = Booking.query.filter_by(id=id).first()
        if booking:
            db.session.delete(booking)
            db.session.commit()
            response_body = ''
            return response_body, 204
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
api.add_resource(BookingsByID, '/bookings/<int:id>')

class Reviews(Resource):

    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return reviews, 200
    
    def post(self):
        try:
            data = request.get_json()
            review = Review(
                title = data['title'],
                review = data['review'],
                reviewer_id = data['reviewer_id'],
                reviewed_rental_id = data['reviewed_rental_id']
            )
            db.session.add(review)
            db.session.commit()
            review_dict = review.to_dict()
            return make_response(review_dict, 201)
        except Exception as e:
            print(e)
            response_body = {'errors': ['validation errors']}
            return response_body, 400
    
api.add_resource(Reviews, '/reviews')

class ReviewsByID(Resource):

    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            review_dict = review.to_dict()
            return review_dict, 200
        else:
            response_body = {"error": "Rental not found"}
            return response_body, 404
        
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        data = request.get_json()
        if review:
            for attr, value, in data.items():
                setattr(review, attr, value)
            db.session.add(review)
            db.session.commit()
            review_dict = review.to_dict()
            return review_dict, 202
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            db.session.delete(review)
            db.session.commit()
            response_body = ''
            return response_body, 204
        else:
            response_body = {'error': 'User not found'}
            return response_body, 404
        
api.add_resource(ReviewsByID, '/reviews/<int:id>')

class SignUp(Resource):

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

api.add_resource(SignUp, '/signup')

class CheckSession(Resource):

    def get(self):

        user_id = session.get('user_id')

        if user_id:
            user = User.query.filter(User.id == user_id).first()
            user_dict = user.to_dict()
            return user_dict, 200
        return {}, 204

api.add_resource(CheckSession, '/checksession')

class Login(Resource):

    def post(self):

        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            user_dict = user.to_dict()
            return user_dict, 200
        else:
            response_body = {'error': 'Invalid username and password'}
            return response_body, 401
        
api.add_resource(Login, '/login')

class Logout(Resource):

    def delete(self):

        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

