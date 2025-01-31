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
    owned_rentals = db.relationship('Rental', back_populates='owner', cascade='all, delete-orphan')

    bookings = db.relationship('Booking', back_populates='traveler', cascade='all, delete-orphan')

    rentals = association_proxy('bookings', 'rental')

    #Add serialization rules
    serialize_rules = ('-bookings.user', '-owned_rentals.owner',)

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
    owner_id = db.Column(db.Integer, db.ForeignKey('users.id'))

    owner = db.relationship('User', back_populates='owned_rentals')

    bookings = db.relationship('Booking', back_populates='rental', cascade='all, delete-orphan')

    traveler = association_proxy('bookings', 'traveler')

    # Add serialization rules
    serialize_rules = ('-owner.owned_rentals', '-bookings.rental',)

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

# Traveler = aliased(User, name="traveler")

# Session = sessionmaker(bind=engine)
# session = Session()

# result = session.query(Booking, User.username.label('traveler_name'))\
#             .join(User, Booking.user_id == User.id)\
#             .all()