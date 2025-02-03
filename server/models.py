from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property


from config import db, datetime, bcrypt



# Models go here!

class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, nullable=False)
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

    #Add serialization rules
    serialize_rules = ('-bookings.traveler', '-owned_rentals.owner', '-reviews.reviewer',)

class Rental(db.Model, SerializerMixin):
    __tablename__ = 'rentals'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    address = db.Column(db.String)
    city = db.Column(db.String)
    state = db.Column(db.String)
    daily_rate = db.Column(db.Integer)
    description = db.Column(db.String)
    cover_pic = db.Column(db.String)

    #add relationships
    #one-many user(owner)
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    owner = db.relationship('User', back_populates='owned_rentals')

    #many-many-bookings
    bookings = db.relationship('Booking', back_populates='rental', cascade='all, delete-orphan')
    traveler = association_proxy('bookings', 'traveler')

    #many-many-rentals
    reviews = db.relationship('Review', back_populates='reviewed_rental', cascade='all, delete-orphan')
    reviewer = association_proxy('reviews', 'reviewer')

    # Add serialization rules
    serialize_rules = ('-owner.owned_rentals', '-bookings.rental', '=reviews.reviewed_rental',)

class Booking(db.Model, SerializerMixin):
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

    # Add serialization rules
    serialize_rules = ('-traveler.bookings', '-rental.bookings',)

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    review = db.Column(db.String)

    #Add relatinoships
    reviewer_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    reviewed_rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))

    reviewer = db.relationship('User', back_populates='reviews')
    reviewed_rental = db.relationship('Rental', back_populates='reviews')

    # Add serialization rules
    serialize_rules = ('-reviewer.reviews', '-reviewed_rental.reviews',)
    