#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, make_response, session, jsonify
from flask_restful import Resource

# Local imports
from config import app, db, api
# Add your model imports
from models import User, Rental, Booking, Review, Amenity, UserSchema, RentalSchema, BookingSchema, ReviewSchema, AmenitySchema, datetime

user_schema = UserSchema()
users_schema = UserSchema(many=True)
rental_schema = RentalSchema()
rentals_schema = RentalSchema(many=True)
booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)
review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)
amenity_schema = AmenitySchema()
amenities_schema = AmenitySchema(many=True)

# Views go here!

@app.route('/')
def index():
    return '<h1>Project Server</h1>'

class Users(Resource):

    def get(self):

        users = User.query.all()
        response = make_response(users_schema.dump(users), 200)
        return response
    
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
            response = make_response(
                user_schema.dump(user), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Users,'/users')

class UsersByID(Resource):

    def get(self, id):
        user = User.query.filter_by(id=id).first()
        response = make_response(
            user_schema.dump(user), 200
        )
        return response
    
    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        data = request.get_json()
        if user:
            for attr, value, in data.items():
                setattr(user, attr, value)
            db.session.add(user)
            db.session.commit()
            response = make_response(
                user_schema.dump(user), 202)
            return response
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

        rentals = Rental.query.all()
        response = make_response(rentals_schema.dump(rentals), 200)
        return response
    
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
            if rental.daily_rate < 1:
                raise ValueError('Daily rate must be over 0')
            db.session.add(rental)
            db.session.commit()
            response = make_response(
                rental_schema.dump(rental), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Rentals, '/rentals')

class RentalsByID(Resource):

    def get(self, id):
        rental = Rental.query.filter_by(id=id).first()
        response = make_response(
            rental_schema.dump(rental), 200
        )
        return response
    
    def patch(self, id):
        rental = Rental.query.filter_by(id=id).first()
        data = request.get_json()
        if rental:
            for attr, value, in data.items():
                setattr(rental, attr, value)
            db.session.add(rental)
            db.session.commit()
            response = make_response(
                rental_schema.dump(rental), 202)
            return response
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

        bookings = Booking.query.all()
        response = make_response(bookings_schema.dump(bookings), 200)
        return response
    
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
            response = make_response(
                booking_schema.dump(booking), 202)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Bookings, '/bookings')

class BookingsByID(Resource):

    def get(self, id):
        booking = Booking.query.filter_by(id=id).first()
        response = make_response(
            booking_schema.dump(booking), 200
        )
        return response
    
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
                response = make_response(
                booking_schema.dump(booking), 202)
                return response
            except ValueError as e:
                response_body = {'error': 'Invalid date format. Please use MM/DD/YYYY.'}
                return response_body, 400
        else:
            response_body = {'error': 'Booking not found'}
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
        reviews = Review.query.all()
        response = make_response(reviews_schema.dump(reviews), 200)
        return response
    
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

            response = make_response(
                review_schema.dump(review), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400
    
api.add_resource(Reviews, '/reviews')

class ReviewsByID(Resource):

    def get(self, id):
        review = Review.query.filter_by(id=id).first()
        response = make_response(
            review_schema.dump(review), 200
        )
        return response
    
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        data = request.get_json()
        if review:
            for attr, value, in data.items():
                setattr(review, attr, value)
            db.session.add(review)
            db.session.commit()

            response = make_response(
            review_schema.dump(review), 202)
            return response
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

class Amenities(Resource):

    def get(self):

        amenities = Amenity.query.all()
        response = make_response(amenities_schema.dump(amenities), 200)
        return response
    
    def post(self):
        try:
            data = request.get_json()
            amenity = Amenity(
                name = data['name']
            )
            db.session.add(amenity)
            db.session.commit()

            response = make_response(
                amenity_schema.dump(amenity), 201)
            return response
        except Exception as e:
            response_body = {'errors': [str(e)]}
            return response_body, 400

api.add_resource(Amenities, '/amenities')

class AmenitiesByID(Resource):

    def get(self, id):
        amenity = Amenity.query.filter_by(id=id).first()
        response = make_response(
            amenity_schema.dump(amenity), 200
        )
        return response
    
    def patch(self, id):
        amenity = Amenity.query.filter_by(id=id).first()
        data = request.get_json()
        if amenity:
            for attr, value, in data.items():
                setattr(amenity, attr, value)
            db.session.add(amenity)
            db.session.commit()

            response = make_response(
            amenity_schema.dump(amenity), 202)
            return response
        else:
            response_body = {'error': 'Amenity not found'}
            return response_body, 404
        
    def delete(self, id):
        amenity = Amenity.query.filter_by(id=id).first()
        if amenity:
            db.session.delete(amenity)
            db.session.commit()
            response_body = ''
            return response_body, 204
        else:
            response_body = {'error': 'Amenity not found'}
            return response_body, 404
    
api.add_resource(AmenitiesByID, '/amenities/<int:id>')

class RentalByIDAppendAmenityByID(Resource):

    def patch(self, id):

        rental = Rental.query.filter_by(id=id).first()
        data = request.get_json()

        # Correct the filter method to filter_by instead of filter
        amenity = Amenity.query.filter_by(id=data['id']).first()

        if not rental:
            response_body = {'error': 'Rental not found'}
            return response_body, 404

        if not amenity:
            response_body = {'error': 'Amenity not found'}
            return response_body, 404

        rental.amenities.append(amenity)
        db.session.commit()
        response = make_response(rental_schema.dump(rental), 202)
        return response
            
            

api.add_resource(RentalByIDAppendAmenityByID, '/rentalamenities/<int:id>')

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
            response = make_response(
                user_schema.dump(user), 201)
            return response
        except:
            response_body = {'errors': ['validation errors']}
            return response_body, 400

api.add_resource(SignUp, '/signup')

class CheckSession(Resource):

    def get(self):

        user_id = session.get('user_id')

        if user_id:
               user = User.query.filter(User.id == user_id).first()
               response = make_response(user_schema.dump(user), 200)
               return response
        else:
            # Return a response that can be safely parsed as JSON
            response_body = {"message": "No active session", "session": None}
            response = make_response(jsonify(response_body), 200)
            return response

api.add_resource(CheckSession, '/checksession')

class Login(Resource):

    def post(self):

        username = request.get_json().get('username')
        user = User.query.filter(User.username == username).first()

        password = request.get_json()['password']

        if user.authenticate(password):
            session['user_id'] = user.id
            response = make_response(
                user_schema.dump(user), 200)
            return response
        else:
            response_body = {'error': 'Invalid username and password'}
            return response_body, 401
        
    # def post(self):

    #     username = request.get_json().get('username')
    #     user = User.query.filter(User.username == username).first()

    #     password = request.get_json()['password']

    #     if user.authenticate(password):
    #         session['user_id'] = user.id
    #         user_dict = user.to_dict()
    #         return user_dict, 200
    #     else:
    #         response_body = {'error': 'Invalid username and password'}
    #         return response_body, 401
            
        
api.add_resource(Login, '/login')

class Logout(Resource):

    def delete(self):

        session['user_id'] = None
        return {}, 204
    
api.add_resource(Logout, '/logout')




if __name__ == '__main__':
    app.run(port=5555, debug=True)

