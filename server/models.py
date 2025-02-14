# from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from marshmallow import Schema, fields
from sqlalchemy.orm import validates
from sqlalchemy import CheckConstraint
from email_validator import validate_email, EmailNotValidError

# marshmallow schema fields


from config import db, datetime, bcrypt, metadata, ma


# Models go here!

rental_amenities = db.Table(
    'rental_amenities',
    metadata,
    db.Column('rental_id', db.Integer, db.ForeignKey(
        'rentals.id'), primary_key=True),
    db.Column('amenity_id', db.Integer, db.ForeignKey(
        'amenities.id'), primary_key=True)
    )

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False, unique=True)
    _password_hash = db.Column(db.String)
    email = db.Column(db.String)
    first_name = db.Column(db.String)
    last_name = db.Column(db.String)
    profile_pic = db.Column(db.String)

    @hybrid_property
    def password_hash(self):
        raise Exception('Password hashes may not be viewed.')
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(
            self._password_hash, password.encode('utf-8'))
    
    #add relationships
    #one-many rental
    owned_rentals = db.relationship('Rental', back_populates='owner', cascade='all, delete-orphan')

    #many-many booking rental(traveler)
    bookings = db.relationship('Booking', back_populates='traveler', cascade='all, delete-orphan')
    rentals = association_proxy('bookings', 'rental')

    #many-many review rental(reviewer)
    reviews = db.relationship('Review', back_populates='reviewer', cascade='all, delete-orphan')
    reviewed_rentals = association_proxy('reviews', 'reviewed_rental')

    #validation
    @validates('username')
    def validate_username(self, key, username):
        if len(username) < 3 or len(username) > 15:
            raise ValueError('username must be between 3 and 15 characters')
        return username
    
    @validates('first_name')
    def validate_first_name(self, key, first_name):
        if len(first_name) < 1 or len(first_name) > 20:
            raise ValueError('first name must be between 1 and 20 characters')
        return first_name
    
    @validates('last_name')
    def validate_last_name(self, key, last_name):
        if len(last_name) < 1 or len(last_name) > 20:
            raise ValueError('last name must be between 1 and 20 characters')
        return last_name
    
    @validates('email')
    def validate_email(self, key, email):
        try:
            validate_email(email)
        except EmailNotValidError:
            raise ValueError("Invalid email address")
        return email


class Rental(db.Model):
    __tablename__ = 'rentals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    daily_rate = db.Column(db.Integer, CheckConstraint('daily_rate > 0'), nullable=False)
    description = db.Column(db.String)
    cover_pic = db.Column(db.String)

    #add relationships
    #one-many user(owner)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', back_populates='owned_rentals')

    #many-many-bookings
    bookings = db.relationship('Booking', back_populates='rental', cascade='all, delete-orphan')
    traveler = association_proxy('bookings', 'traveler')

    # many-many-reviews
    reviews = db.relationship('Review', back_populates='reviewed_rental', cascade='all, delete-orphan')
    reviewer = association_proxy('reviews', 'reviewer')

    amenities = db.relationship(
        'Amenity', secondary=rental_amenities, back_populates='rentals')
    
    #validation
    @validates('name')
    def validate_username(self, key, name):
        if len(name) < 3 or len(name) > 50:
            raise ValueError('name must be between 3 and 50 characters')
        return name
    
    @validates('address')
    def validate_address(self, key, address):
        if len(address) < 3 or len(address) > 30:
            raise ValueError('address must be between 3 and 30 characters')
        return address
    
    @validates('city')
    def validate_city(self, key, city):
        if len(city) < 3 or len(city) > 20:
            raise ValueError('city must be between 3 and 20 characters')
        return city
    
    @validates('daily_rate')
    def validate_daily_rate(self, key, daily_rate):
        if daily_rate < 1:
            raise ValueError('Daily rate must be at least 1.')
        return daily_rate

    @validates('description')
    def validate_daily_rate(self, key, description):
        if len(description) < 3:
            raise ValueError('description must not be less than 3 characters.')
        return description

class Booking(db.Model):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    #Add relatinoships
    traveler_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))

    traveler = db.relationship('User', back_populates='bookings')
    rental = db.relationship('Rental', back_populates='bookings')

    # # Add serialization rules
    # serialize_rules = ('-traveler.bookings', '-rental.bookings', '-traveler.reviews', '-reviewed_rental.reviews')

    #validation
    @validates('end_date')
    def validate_end_date(self, key, end_date):
        if self.start_date and end_date < self.start_date:
            raise ValueError('End date cannot be earlier than start date.')
        return end_date

class Review(db.Model):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    review = db.Column(db.String)

    #Add relatinoships
    reviewer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reviewed_rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))

    reviewer = db.relationship('User', back_populates='reviews')
    reviewed_rental = db.relationship('Rental', back_populates='reviews')

    #validation
    @validates('title')
    def validate_title(self, key, title):
        if len(title) < 3 or len(title) > 50:
            raise ValueError('title must be between 3 and 50 characters')
        return title
    
    @validates('review')
    def validate_review(self, key, review):
        if len(review) < 3:
            raise ValueError('review must be more than 3 characters')
        return review

class Amenity(db.Model):
    __tablename__ = 'amenities'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)

    rentals = db.relationship(
        'Rental', secondary=rental_amenities, back_populates='amenities')
    
    
class UserSchema(ma.SQLAlchemySchema):
    class Meta:
        model = User
        load_instance = True

    id = ma.auto_field()
    username = ma.auto_field()
    first_name = ma.auto_field()
    last_name = ma.auto_field()
    email = ma.auto_field()
    profile_pic = ma.auto_field()
    # owned_rentals = ma.Nested(lambda: RentalSchema, many=True, only=('id', 'name', 'address', 'bookings'))
    owned_rentals = fields.List(fields.Nested(lambda: RentalSchema(only=('id', 'name', 'city', 'address', 'state', 'description', 'daily_rate', 'cover_pic', 'bookings', 'reviews', 'amenities'))))
    # rentals = ma.Nested(lambda: RentalSchema, many=True, only=('id', 'name', 'city', 'amenities', 'bookings'))
    rentals = ma.Method("get_bookings")
    # bookings = ma.Nested(lambda: BookingSchema, many=True, only=("id", "start_date", "end_date", "rental"))
    

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "usersbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("users"),
        }
    )

    def get_bookings(self, user):
        rentals = user.rentals
        rental_schema = RentalSchema()
        filtered_rentals = []
        for rental in rentals:
            filtered_bookings = [booking for booking in rental.bookings if booking.traveler_id == user.id]
            rental_data = rental_schema.dump(rental)
            rental_data['bookings'] = BookingSchema(many=True).dump(filtered_bookings)
            filtered_rentals.append(rental_data)
        return filtered_rentals

user_schema = UserSchema()
users_schema = UserSchema(many=True)

class RentalSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Rental
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    address = ma.auto_field()
    city = ma.auto_field()
    state = ma.auto_field()
    daily_rate = ma.auto_field()
    description = ma.auto_field()
    cover_pic = ma.auto_field()
    owner = ma.Nested(lambda: UserSchema, only=('id', 'first_name', 'last_name', 'profile_pic'))
    traveler = ma.Nested(lambda: UserSchema, many=True, only=('id', 'first_name', 'last_name'))
    bookings = ma.Nested(lambda: BookingSchema, many=True, only=("id", "start_date", "end_date", "traveler"))
    reviews = ma.Nested(lambda: ReviewSchema, many=True, only=('id', 'title', 'review', 'reviewer'))
    amenities = ma.Nested(lambda: AmenitySchema, many=True, only=('id', 'name'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "rentalsbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("rentals"),
        }
    )

rental_schema = RentalSchema()
rentals_schema = RentalSchema(many=True)

class RentalMinimalSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Rental
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    address = ma.auto_field()
    city = ma.auto_field()
    state = ma.auto_field()
    daily_rate = ma.auto_field()
    description = ma.auto_field()
    cover_pic = ma.auto_field()
    owner = ma.Nested(lambda: UserSchema, only=('id', 'first_name', 'last_name', 'profile_pic'))
    reviews = ma.Nested(lambda: ReviewSchema, many=True, only=('id', 'title', 'review', 'reviewer'))
    amenities = ma.Nested(lambda: AmenitySchema, many=True, only=('id', 'name'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "rentalsbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("rentals"),
        }
    )

rental_minimal_schema = RentalMinimalSchema()
rentals_minimal_schema = RentalMinimalSchema(many=True)


class BookingSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Booking
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()
    start_date = ma.auto_field()
    end_date = ma.auto_field()
    traveler_id = ma.auto_field()
    rental_id = ma.auto_field()

    traveler = ma.Nested(UserSchema, only=('id', 'username', 'first_name', 'last_name'))
    rental = ma.Nested(RentalSchema, only=('id', 'name'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "bookingsbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("bookings"),
        }
    )
        
booking_schema = BookingSchema()
bookings_schema = BookingSchema(many=True)

class ReviewSchema(ma.SQLAlchemySchema):
    class Meta:
        model = Review
        load_instance = True
    
    id = ma.auto_field()
    title = ma.auto_field()
    review = ma.auto_field()
    reviewer_id = ma.auto_field()
    reviewed_rental_id = ma.auto_field()

    reviewer = ma.Nested(UserSchema, only=('id', 'first_name'))
    reviewed_rental = ma.Nested(RentalSchema, only=('id', 'name'))

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "reviewsbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("reviews"),
        }
    )

review_schema = ReviewSchema()
reviews_schema = ReviewSchema(many=True)


class AmenitySchema(ma.SQLAlchemySchema):
    class Meta:
        model = Amenity
        load_instance = True

    id = ma.auto_field()
    name = ma.auto_field()

    url = ma.Hyperlinks(
        {
            "self": ma.URLFor(
                "amenitiesbyid",
                values=dict(id="<id>")),
            "collection": ma.URLFor("amenities"),
        }
    )

amenity_schema = AmenitySchema()
amenities_schema = AmenitySchema(many=True)