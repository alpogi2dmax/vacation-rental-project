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
    bookings = db.relationship('Booking', back_populates='user', cascade='all, delete-orphan')

    rentals = association_proxy('bookings', 'rental', creator=lambda rental_obj: Booking(rental=rental_obj))

    #Add serialization rules
    serialize_rules = ('-bookings.user',)

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
    bookings = db.relationship('Booking', back_populates='rental', cascade='all, delete-orphan')

    users = association_proxy('bookings', 'user', creator=lambda user_obj: Booking(user=user_obj))

    #Add serialization rules
    serialize_rules = ('-bookings.rental',)

class Booking(db.Model, SerializerMixin):
    __tablename__ = 'bookings'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, nullable=False)
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)

    #Add relatinoships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    rental_id = db.Column(db.Integer, db.ForeignKey('rentals.id'))

    user = db.relationship('User', back_populates='bookings')
    rental = db.relationship('Rental', back_populates='bookings')

    #Add serialization rules
    serialize_rules = ('-user.bookings', '-rental.bookings',)