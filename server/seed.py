#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc
from sqlalchemy import text

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User, Rental, Booking, Review, Amenity, datetime

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        db.create_all()

        def clear_rental_amenities():
        
            db.session.execute(text('DELETE FROM rental_amenities'))

        print("Starting seed...")
        # Seed code goes here!

        print("Clearing db...")
        User.query.delete()
        Rental.query.delete()
        Booking.query.delete()
        Review.query.delete()
        Amenity.query.delete()
        clear_rental_amenities()
        db.session.commit()


        print("Seeding users...")
        users = []
        user1 = User(
            username='alcerdanlico',
            email='alcerdanlico@gmail.com',
            first_name='Al Cerdan',
            last_name='Lico',
            profile_pic='image'
        )
        user1.password_hash = 'password'
        users.append(user1)
        user2 = User(
            username='gelolico',
            email='gelolico@gmail.com',
            first_name='Angelo Christopher',
            last_name='Lico',
            profile_pic='image'
        )
        user2.password_hash = 'password'
        users.append(user2)
        db.session.add_all(users)

        print("Seeding rentals...")
        rentals = []
        rental1 = Rental(name='Mountain Area Cottage', address ='123 Street St', city='Lake Tahoe', state='CA', description='Such a lovely place!', daily_rate=125, cover_pic='image', owner_id=2)
        rentals.append(rental1)
        db.session.add_all(rentals)

        print("Seeding bookings...")
        bookings = []
        bookings.append(Booking(name='alcerdanlico-Mountain Area Cottage', start_date=datetime.strptime('05/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('05/05/2025', '%m/%d/%Y'), traveler_id=1, rental_id=1))
        db.session.add_all(bookings)

        print("Seeding reviews...")
        reviews = []
        reviews.append(Review(title='Beautiful', review='I would love to go back!', reviewer_id=1, reviewed_rental_id=1))
        db.session.add_all(reviews)

        print("Seeding amenities...")
        amenity1 = Amenity(name='Swimming Pool')
        rental1.amenities.append(amenity1)
        db.session.commit()


        

        print("Seeding done!")
