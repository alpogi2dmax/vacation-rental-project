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
            username='lightyagami',
            email='lightyagami@gmail.com',
            first_name='Light',
            last_name='Yagami',
            profile_pic='https://i.imgur.com/q4IgIRx.png'
        )
        user1.password_hash = 'password'
        users.append(user1)
        user2 = User(
            username='roronoazoro',
            email='roronoazoro@gmail.com',
            first_name='Roronoa',
            last_name='Zoro',
            profile_pic='https://i.imgur.com/XcxCRIW.png'
        )
        user2.password_hash = 'password'
        users.append(user2)
        user3 = User(
            username='leviackerman',
            email='leviackerman@gmail.com',
            first_name='Levi',
            last_name='Ackerman',
            profile_pic='https://i.imgur.com/Bfqji06.png'
        )
        user3.password_hash = 'password'
        users.append(user3)
        user4 = User(
            username='edwardeldric',
            email='edwardeldric@gmail.com',
            first_name='Edward',
            last_name='Eldric',
            profile_pic='https://i.imgur.com/Tf2jQQV.png'
        )
        user4.password_hash = 'password'
        users.append(user4)
        user5 = User(
            username='gojosatoru',
            email='gojosatoru@gmail.com',
            first_name='Gojo',
            last_name='Satoru',
            profile_pic='https://i.imgur.com/qRfUCpd.png'
        )
        user5.password_hash = 'password'
        users.append(user5)
        user6 = User(
            username='josephjoestar',
            email='josephjoestar@gmail.com',
            first_name='Joseph',
            last_name='Joestar',
            profile_pic='https://i.imgur.com/U44ASCB.png'
        )
        user6.password_hash = 'password'
        users.append(user6)
        user7 = User(
            username='monkeydluffy',
            email='monkeydluffy@gmail.com',
            first_name='Monkey',
            last_name='Luffy',
            profile_pic='https://i.imgur.com/JrCXyOZ.png'
        )
        user7.password_hash = 'password'
        users.append(user7)
        user8 = User(
            username='arsenelupiniii',
            email='arsenelupiniii@gmail.com',
            first_name='Arsene',
            last_name='Lupin III',
            profile_pic='https://i.imgur.com/R6497xl.png'
        )
        user8.password_hash = 'password'
        users.append(user8)
        user9 = User(
            username='kenshinhimura',
            email='kenshinhimura@gmail.com',
            first_name='Kenshin',
            last_name='Himura',
            profile_pic='https://i.imgur.com/0Mq5J1u.png'
        )
        user9.password_hash = 'password'
        users.append(user9)
        user10 = User(
            username='spikespiegel',
            email='spikespiegel@gmail.com',
            first_name='Spike',
            last_name='Spiegel',
            profile_pic='https://i.imgur.com/DBYghZ8.png'
        )
        user10.password_hash = 'password'
        users.append(user10)
        db.session.add_all(users)

        print("Seeding rentals...")
        rentals = []
        rental1 = Rental(
            name='Tree-Top Window Loft-Unique Nature Experience',
            address ='123 Treetop Street',
            city='Sautee Nacoochee',
            state='GA',
            description='The Loft is located in the forest on 22 acres that we call Farfalla, along with 2 other geodesic dome rentals. Less than 10 min drive to Helen, Yonah Mtn, Anna Ruby Falls, Lake Unicoi, and so much more! As former adventure travel guides we fell in love with this area because of the great hiking trails and stunning national forest that surrounds Sautee.',
            daily_rate=199,
            cover_pic="https://i.imgur.com/DLQRON3.png",
            owner_id=1
            )
        rentals.append(rental1)
        rental2 = Rental(
            name='Luxurious Ranch Retreat',
            address ='111 Ranch Street',
            city='Troutman',
            state='NC',
            description='Come experience Weatherstone Ranch! View Mini Highland Cattle & Valais Blacknose sheep in comfort - pastoral views and a 54-acre working-farm experience awaits! Plenty of woods to explore and farm activities on site, but lots of nearby attractions like Lake Norman State Park, Zootastic, Davaste Vineyards, Fort Dobbs, Iredell Fairgrounds (of Dixie Horse Auction fame) and lots more. Seasonal highlights include lambing and calving & shearing time.',
            daily_rate=285,
            cover_pic='https://i.imgur.com/sjam4f8.png',
            owner_id=2
            )
        rentals.append(rental2)
        rental3 = Rental(
            name='Mulk Place',
            address ='222 City Street',
            city='San Francisco',
            state='CA',
            description='Studio suite with a private entrance located in the Parkside/Upper Sunset area of San Francisco. Studio suite is attached to an occupied family home. Close to restaurants and shops in the West Portal area. Stern Grove Park in walking distance. Ocean Beach, Golden Gate Park, and San Francisco Zoo all within one mile. Transportation on Muni or the street car to anywhere in the city just one block away. Parking in the neighborhood is easy with 24 hour street parking down the street.',
            daily_rate=172,
            cover_pic='https://i.imgur.com/fIErwGj.png',
            owner_id=3
            )
        rentals.append(rental3)
        rental4 = Rental(
            name='Boho Chic Retreat w/Patio',
            address ='553 Boho St',
            city='Austin',
            state='TX',
            description='Welcome to Boho Bungalow, a beautifully remodeled 1-bedroom, 1-bath private loft in NW Austin—perfect for bachelorettes, couples, friends, and weekend getaways!',
            daily_rate=163,
            cover_pic='https://i.imgur.com/HDOjxsn.png',
            owner_id=4
            )
        rentals.append(rental4)
        rental5 = Rental(
            name='Cozy, modern retreat in vibrant, trendy ‘hood',
            address ='999 Suite St',
            city='Chicago',
            state='IL',
            description='Artfully restored, turn-of-the-century apartment in hot Ukrainian Village. Casual yet considered, this sunny, basement-level studio is steps from award-winning restaurants, swank bars, public transportation, and more. Chicago’s best kept secret, this safe, centrally-located neighborhood is close to it all!',
            daily_rate=186,
            cover_pic='https://i.imgur.com/56KM4GL.png',
            owner_id=5
            )
        rentals.append(rental5)
        db.session.add_all(rentals)

        print("Seeding bookings...")
        bookings = []
        bookings.append(Booking(name='alcerdanlico-Mountain Area Cottage', start_date=datetime.strptime('05/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('05/05/2025', '%m/%d/%Y'), traveler_id=2, rental_id=1))
        bookings.append(Booking(name='glendalico-Seaside Cabana', start_date=datetime.strptime('06/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('06/05/2025', '%m/%d/%Y'), traveler_id=3, rental_id=2))
        bookings.append(Booking(name='gelolico-City Condo', start_date=datetime.strptime('07/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('07/05/2025', '%m/%d/%Y'), traveler_id=1, rental_id=3))
        db.session.add_all(bookings)

        print("Seeding reviews...")
        reviews = []
        reviews.append(Review(title='Beautiful', review='I would love to go back!', reviewer_id=2, reviewed_rental_id=1))
        db.session.add_all(reviews)

        print("Seeding amenities...")
        amenities_list = []
        amenities_list.append(Amenity(name='Wifi'))
        amenities_list.append(Amenity(name='Kitchen'))
        amenities_list.append(Amenity(name='Air Conditioning'))
        amenities_list.append(Amenity(name='Fire Place'))
        amenities_list.append(Amenity(name='Garden'))
        amenities_list.append(Amenity(name='Washer and Dryer - In Unit'))
        amenities_list.append(Amenity(name='Free Driveway'))
        amenity1 = Amenity(name='Swimming Pool')
        rental1.amenities.append(amenity1)
        db.session.add_all(amenities_list)
        db.session.commit()


        

        print("Seeding done!")
