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
            name='Cozy, modern retreat in vibrant, trendy place',
            address ='999 Suite St',
            city='Chicago',
            state='IL',
            description='Artfully restored, turn-of-the-century apartment in hot Ukrainian Village. Casual yet considered, this sunny, basement-level studio is steps from award-winning restaurants, swank bars, public transportation, and more. Chicago’s best kept secret, this safe, centrally-located neighborhood is close to it all!',
            daily_rate=186,
            cover_pic='https://i.imgur.com/56KM4GL.png',
            owner_id=5
            )
        rentals.append(rental5)
        rental6 = Rental(
            name='Cozy 2/1.5 Getaway',
            address ='44 Pond St',
            city='Lily Pond',
            state='MD',
            description='Take it easy at our Polk Street Suites, a unique and tranquil space. A 2-level row house, 2 bedrooms, 1 full and 1 half bathroom getaway. Whether on a quick business trip, staycation or vacation, you are right at home with all the necessary amenities. It comfortably sleeps 4-6 guests. The Master Suite contains a queen-sized bed. Suite 2 contains a full-sized bed. The main level has a full sized futon. The property features a fully stocked gourmet style kitchen with stainless steel appliances.',
            daily_rate=114,
            cover_pic='https://i.imgur.com/c2QmWFj.png',
            owner_id=6
            )
        rentals.append(rental6)
        rental7 = Rental(
            name='Elite Homes Water front Suit',
            address ='789 Elite St',
            city='Seatac',
            state='WA',
            description='This is waterfront Lake home, 2.7 miles from SeaTac Airport. The Lake is link light rail station from SeaTac International. 1min freeway entrance, 15min drive to downtown Seattle. This home is located on a private road with 2 parking spots and separate entry. You will have your own private apartment, beach on Angle Lake. Lake view from your bedroom, living room or balcony with 180 degree of lake view.',
            daily_rate=199,
            cover_pic='https://i.imgur.com/7at3Luf.png',
            owner_id=7
            )
        rentals.append(rental7)
        rental8 = Rental(
            name='New luxury cabin bordering Zion!',
            address ='999 Luxury St',
            city='Orderville',
            state='UT',
            description="This new mountain home is on a one acre wooded lot set back from the road and is minutes from Zion National Park's East Entrance. It has three king bedrooms, each with en suite bathrooms, a private den with pull-out sofa bed, a fully equipped eat-in kitchen, two covered patios, and a great room with a fireplace and large windows open to nature -- perfect for relaxing after a day out exploring!",
            daily_rate=350,
            cover_pic='https://i.imgur.com/X3Dz3Fb.png',
            owner_id=8
            )
        rentals.append(rental8)
        rental9 = Rental(
            name='Panoramic King Room with Mountain View',
            address ='78 Panoramic St',
            city='Sedona',
            state='AZ',
            description="Indulge in the ultimate Sedona experience with our Panoramic King Room with Fireplace and Mountain View at Wildflower Inn at Bell Rock. Designed for guests seeking both comfort and natural beauty, this room offers a luxurious king-sized bed adorned with premium linens and a down comforter, ensuring a restful night's sleep.",
            daily_rate=244,
            cover_pic='https://i.imgur.com/qBUZKva.png',
            owner_id=9
            )
        rentals.append(rental9)
        rental10 = Rental(
            name='Large Modern Guest Suite - Manhattan',
            address ='22 46th St',
            city='New York',
            state='NY',
            description="Welcome to this spacious 1-bedroom suite in the heart of the Lower East Side. Enjoy a private balcony, in unit washer/dryer & access to a beautiful roof deck with stunning views, along with a gym & lounge. Centrally located a few blocks from the Clinton Street Baking Company & Katz's Delicatessen on Houston St. Also a short walk to the East Village, Nolita, Little Italy, Chinatown, Noho, Soho, the West Village & more.",
            daily_rate=298,
            cover_pic='https://i.imgur.com/K8EUu4j.png',
            owner_id=10
            )
        rentals.append(rental10)
        db.session.add_all(rentals)

        print("Seeding bookings...")
        bookings = []
        bookings.append(Booking(name='traverer_1-rental_10', start_date=datetime.strptime('05/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('05/05/2025', '%m/%d/%Y'), traveler_id=1, rental_id=10))
        bookings.append(Booking(name='traverer_1-rental_2', start_date=datetime.strptime('06/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('06/05/2025', '%m/%d/%Y'), traveler_id=1, rental_id=2))
        bookings.append(Booking(name='traverer_2-rental_1', start_date=datetime.strptime('07/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('07/05/2025', '%m/%d/%Y'), traveler_id=2, rental_id=1))
        bookings.append(Booking(name='traverer_2-rental_3', start_date=datetime.strptime('03/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('03/08/2025', '%m/%d/%Y'), traveler_id=2, rental_id=9))
        bookings.append(Booking(name='traverer_3-rental_4', start_date=datetime.strptime('06/21/2025', '%m/%d/%Y'), end_date=datetime.strptime('06/29/2025', '%m/%d/%Y'), traveler_id=3, rental_id=4))
        bookings.append(Booking(name='traverer_3-rental_2', start_date=datetime.strptime('12/06/2025', '%m/%d/%Y'), end_date=datetime.strptime('12/14/2025', '%m/%d/%Y'), traveler_id=3, rental_id=2))
        bookings.append(Booking(name='traverer_4-rental_5', start_date=datetime.strptime('10/21/2025', '%m/%d/%Y'), end_date=datetime.strptime('10/28/2025', '%m/%d/%Y'), traveler_id=4, rental_id=3))
        bookings.append(Booking(name='traverer_4-rental_3', start_date=datetime.strptime('09/17/2025', '%m/%d/%Y'), end_date=datetime.strptime('09/21/2025', '%m/%d/%Y'), traveler_id=4, rental_id=5))
        bookings.append(Booking(name='traverer_5-rental_4', start_date=datetime.strptime('05/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('05/05/2025', '%m/%d/%Y'), traveler_id=5, rental_id=4))
        bookings.append(Booking(name='traverer_5-rental_6', start_date=datetime.strptime('06/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('06/05/2025', '%m/%d/%Y'), traveler_id=5, rental_id=6))
        bookings.append(Booking(name='traverer_6-rental_5', start_date=datetime.strptime('07/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('07/05/2025', '%m/%d/%Y'), traveler_id=6, rental_id=5))
        bookings.append(Booking(name='traverer_6-rental_7', start_date=datetime.strptime('03/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('03/08/2025', '%m/%d/%Y'), traveler_id=6, rental_id=7))
        bookings.append(Booking(name='traverer_7-rental_6', start_date=datetime.strptime('06/21/2025', '%m/%d/%Y'), end_date=datetime.strptime('06/28/2025', '%m/%d/%Y'), traveler_id=7, rental_id=6))
        bookings.append(Booking(name='traverer_7-rental_8', start_date=datetime.strptime('12/06/2025', '%m/%d/%Y'), end_date=datetime.strptime('12/14/2025', '%m/%d/%Y'), traveler_id=7, rental_id=8))
        bookings.append(Booking(name='traverer_8-rental_7', start_date=datetime.strptime('10/21/2025', '%m/%d/%Y'), end_date=datetime.strptime('10/28/2025', '%m/%d/%Y'), traveler_id=8, rental_id=7))
        bookings.append(Booking(name='traverer_8-rental_9', start_date=datetime.strptime('09/17/2025', '%m/%d/%Y'), end_date=datetime.strptime('09/21/2025', '%m/%d/%Y'), traveler_id=8, rental_id=9))
        bookings.append(Booking(name='traverer_9-rental_8', start_date=datetime.strptime('12/06/2025', '%m/%d/%Y'), end_date=datetime.strptime('12/14/2025', '%m/%d/%Y'), traveler_id=9, rental_id=8))
        bookings.append(Booking(name='traverer_9-rental_10', start_date=datetime.strptime('10/21/2025', '%m/%d/%Y'), end_date=datetime.strptime('10/28/2025', '%m/%d/%Y'), traveler_id=9, rental_id=10))
        bookings.append(Booking(name='traverer_10-rental_9', start_date=datetime.strptime('09/17/2025', '%m/%d/%Y'), end_date=datetime.strptime('09/21/2025', '%m/%d/%Y'), traveler_id=10, rental_id=9))
        bookings.append(Booking(name='traverer_10-rental_1', start_date=datetime.strptime('05/03/2025', '%m/%d/%Y'), end_date=datetime.strptime('05/05/2025', '%m/%d/%Y'), traveler_id=10, rental_id=1))
        db.session.add_all(bookings)

        print("Seeding reviews...")
        reviews = []
        reviews.append(Review(title='This treehouse was the perfect vacation.', review='This treehouse was the perfect vacation. I enjoyed the atmosphere it is absolutely beautiful. Molly was super responsive and the place was even better than described! Thank you for this experience', reviewer_id=2, reviewed_rental_id=1))
        reviews.append(Review(title='We absolutely loved our stay!', review='We absolutely loved our stay! The loft was so comfortable with the most beautiful views of nature and sunrises. So convenient to downtown Helen. We will definitely be coming back!', reviewer_id=3, reviewed_rental_id=1))
        reviews.append(Review(title="Zoro's place was so beautiful.", review="My fiancé and I had such a peaceful getaway. I did not even feel like I was in North Carolina lol. The animals are so cute and friendly. The place was super clean and comfy. Zoro was also super responsive and nice! We definitely will be booking again in the near future!", reviewer_id=3, reviewed_rental_id=2))
        reviews.append(Review(title="Our short stay at Zoro's ranch was amazing.", review='It was exactly what we were looking for. The home was clean, quiet and relaxing. Not only did we get the restful time we needed, but we got to witness the ranch in effect, including the birth of some new calves that made an appearance. Would definitely recommend this location.', reviewer_id=4, reviewed_rental_id=2))
        reviews.append(Review(title='Loved my stay here.', review='Levi is a wonderful host and was so kind and gave great recommendations. The place was exactly as listed and was so beautiful and had everything I needed and more. There are some great restaurants nearby as well. Would stay again!', reviewer_id=4, reviewed_rental_id=3))
        reviews.append(Review(title='Cozy, clean and comfortable.', review='Enjoyed my stay here. Loved that there was a nearby park as well as eateries close by. I would definitely stay here again! Thank you.', reviewer_id=5, reviewed_rental_id=3))
        reviews.append(Review(title="We had an amazing stay!", review="The space was peaceful, beautifully decorated, clean, and a great location to get around Austin. They included some very nice amenities and even left recommendations for us. Would definitely book here again!", reviewer_id=5, reviewed_rental_id=4))
        reviews.append(Review(title="Absolutely loved this place!!!", review='Amazing neighborhood with deer everywhere. The decor was amazing and the balcony was awesome. Definitely recommend!', reviewer_id=6, reviewed_rental_id=4))
        reviews.append(Review(title='Charming Home with Great Accessibility.', review='The neighborhood is pretty cool and easily accessible to the metro and shopping centers. When it comes to the house, it is neat and clean. However, when we arrived, there was still unfinished laundry in the washer.', reviewer_id=7, reviewed_rental_id=6))
        reviews.append(Review(title='A Day Stay', review='While on vacation in VA, we decided to take the family to visit the National Mall for the day. After hanging out all day we arrived at the house before dark. For the most part the neighborhood was quiet. The backyard was not enclosed.', reviewer_id=8, reviewed_rental_id=6))
        reviews.append(Review(title="Very clean, easy walk to bus stop.", review="The pictures of how to get in to the unit were super helpful. Perfect for a weekend running around Chicago.", reviewer_id=6, reviewed_rental_id=5))
        reviews.append(Review(title="Perfect for our weekend stay in Chicago.", review='She was a great host who was very responsive. The place was great! Great location within walking distance from restaurants and coffee shops. Exactly as described. I would definitely stay here again.', reviewer_id=7, reviewed_rental_id=5))
        reviews.append(Review(title='Great place to stay!!', review='We were in Seattle for a fundraiser and needed to be close to the airport and south center. This was a perfect location and a little piece of heaven quite honestly!! I loved watching the rain on the lake.', reviewer_id=8, reviewed_rental_id=7))
        reviews.append(Review(title='5 night stay', review='A friend and I stayed here for 5 nights to visit some friends and attend an event in Seattle. The location is ideal to be able to go into Seattle or any of the surrounding cities.', reviewer_id=9, reviewed_rental_id=7))
        reviews.append(Review(title="I would stay here again in a heartbeat.", review="The house is perfectly kept. And every amenity is available the location was fantastic appropriately remote with amazing views and the incredible starry nights.", reviewer_id=9, reviewed_rental_id=8))
        reviews.append(Review(title="Highly recommended", review='We stayed in this house during our trip to Zion and Bryce Canyon and really enjoyed our stay! The property is newly renovated, nicely decorated and very well stocked! Check-in and communication with the hosts went smoothly! If we ever come back to Zion, I would definitely book this property again!', reviewer_id=10, reviewed_rental_id=8))
        reviews.append(Review(title='Nice stay', review='We enjoyed the location, bbq spot across the street was great. Getting into Sedona and getting to hikes were easy. Clean hotel with nice sheets and towels. Loved being able to see bell rock from our room.', reviewer_id=10, reviewed_rental_id=9))
        reviews.append(Review(title="Great apartment", review="Everything was great, spacious apartment with great amenities, loved the stay", reviewer_id=1, reviewed_rental_id=10))
        reviews.append(Review(title="Wonderful, Clean & Great Location", review='We stayed in this cozy apartment over Thanksgiving week and thoroughly enjoyed its hominess and convenience. Will definitely stay again as our son lives nearby. Super clean and has all the amenities for laundry, cooking and entertainment!', reviewer_id=2, reviewed_rental_id=10))

        db.session.add_all(reviews)

        print("Seeding amenities...")
        amenities_list = []
        amenities_list.append(Amenity(name='Kitchen'))
        amenities_list.append(Amenity(name='Fire Place'))
        amenities_list.append(Amenity(name='Garden'))
        amenities_list.append(Amenity(name='Free Driveway'))
        amenities_list.append(Amenity(name='Backyard'))
        amenities_list.append(Amenity(name='Sound System'))
        amenity1 = Amenity(name='Fast Wifi')
        amenities_list.append(amenity1)
        rental1.amenities.append(amenity1)
        amenity2 = Amenity(name='Air conditioning')
        amenities_list.append(amenity2)
        rental1.amenities.append(amenity2)
        rental2.amenities.append(amenity1)
        amenity3 = Amenity(name='TV')
        amenities_list.append(amenity3)
        rental2.amenities.append(amenity3)
        amenity4 = Amenity(name='Free Street Parking')
        amenities_list.append(amenity4)
        rental3.amenities.append(amenity4)
        rental3.amenities.append(amenity1)
        rental4.amenities.append(amenity1)
        amenity5 = Amenity(name='Exterior Security Cameras')
        amenities_list.append(amenity5)
        rental4.amenities.append(amenity5)
        amenity6 = Amenity(name='Swimming Pool')
        amenities_list.append(amenity6)
        rental6.amenities.append(amenity6)
        amenity7 = Amenity(name='Washer and Dryer - In Unit')
        amenities_list.append(amenity7)
        rental6.amenities.append(amenity7)
        rental5.amenities.append(amenity1)
        rental5.amenities.append(amenity2)
        amenity8 = Amenity(name='Outdoor Space')
        amenities_list.append(amenity8)
        rental7.amenities.append(amenity8)
        rental7.amenities.append(amenity1)
        rental8.amenities.append(amenity6)
        amenity9 = Amenity(name='Barbecue Grill')
        amenities_list.append(amenity9)
        rental8.amenities.append(amenity9)
        amenity10 = Amenity(name='Mountain View')
        amenities_list.append(amenity9)
        rental9.amenities.append(amenity10)
        rental9.amenities.append(amenity2)
        rental10.amenities.append(amenity8)
        rental10.amenities.append(amenity7)
        db.session.add_all(amenities_list)
        db.session.commit()


        

        print("Seeding done!")
