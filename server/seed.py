#!/usr/bin/env python3

# Standard library imports
from random import randint, choice as rc

# Remote library imports
from faker import Faker

# Local imports
from app import app
from models import db, User

if __name__ == '__main__':
    fake = Faker()
    with app.app_context():

        db.create_all()

        print("Starting seed...")
        # Seed code goes here!

        print("Clearing db...")
        User.query.delete()

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
        db.session.add_all(users)
        db.session.commit()

        print("Seeding done!")
