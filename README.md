# Vacation Rental Project

The intention for this is project is to showcase a Full Stack Application utilizing Flask in the back end and React in the front end. The premise of this application is to act as a portal for individuals to either post their vacation properties for other individuals to rent or to rent out vacation properties posted by other individuals. This structure gives the user two roles in relation to the rental properties. The user can either be an owner of the property, or a renter of the property(traveler). The owner can post properties and has the ability to edit owned properties. The owner can also add amenities by selecting on an existing list or creating new amenities to be added. The owner can also remove amenities for their properties. Owners can also delete properties. The renter can book rentals with start and end dates, edit bookings as well as cancel bookings. Reviews can also be created for a rental.

## Set Up

To use the application, run the following commands:

- pipenv shell
- python server/seed.py. This would refresh and populate the database.
- python server/app.py. This would provide access to the back end
- In another terminal, run npm start --prefix client which will give access to the front end.

## BackEnd Structure

The backend utlizes Flask. Serialization is handled by Marshmallow. Files are as follows:

### models.py

Here are the tables that are set up for the project:
- User - The user's model has the following objects
  - username
  - password - password is hashed via bcrypt
  - first name
  - last name
  - profile picture
  Established relationships with the rental and review models as well as associations will give the following objects.
  - owned rentals - rentals via one-to-many relationship with the rental model
  - rentals - rentals via many-to-many relationship with the rental model through the booking model
  - bookings - bookings via many-to-many relationship with the rental model through the booking model
  - reviewed rental - rentals via many-to-many relationship with the rental model through the review model
  - reviews - reviews via many-to-many relationship with the rental model through the review model
- Rental - The rental's model has the following objects.
  - name
  - address
  - city
  - state
  - description
  - daily rate
  - cover pic
  The user model has a one-to-many relationship with the rental model where rental belongs to user. Both also have a many-to-many relationship through the booking model and the review model.
  Established relationships with the rental and review models as well as associations will give the following objects.
  - owner - user via one-to-many relationship with the user model.
  - travelers - user via many-to-many relationship with the user model through the booking model
  - bookings - bookings via many-to-many relationship with the user through the booking model
  - reviewers - user via many-to-many relationsihp with the user through the review model
  - reviews - reviews via many-to-many relationsihp with the user through the review model
  The review model also has a one-to-many relationship with the amenity model. This relationship will give access to the following:
  - amenties - amenities via one-to-many relationship with the amenity model
- Booking - The booking's model has the following objects.
  - name
  - start date
  - end date
  Booking acts as the model that connects the user and rental model. This association will give access to the following
  - travelers - users via many-to-many relationship with the rental model through the booking model
  - rentals - rentals via many-to-many relationship with the user model through the booking model
- Review - the review's model has the following objects.
  - title
  - review
  Review acts as the model that connects the user and rental model. This association will give access to the following:
  - reviewer
  - reviewed rental
- Amenities - amenity's model has the following objects:
  - name

Serialization is handled by Marshmallow. The following schemas are created for serialization.

- UserScehma - method is used to limit the rentals as filtered rentals with only user as traveler. The same is done for bookings.
- RentalSchema - A minimal schema was created to remove bookings
- BookingSchema
- ReviewSchema
- AmenitySchema

### app.py

Utilizing RESTful APIs, it contains Routes for each Resource that allows HTTP Request Methods for each Resource. A Login, CheckSession, and Logout are included for User login and log out. Certain methods are restricted to only work when there is a session.

### seed.py

After the database is created, data is refreshed and populated through seed.py

## FrontEnd Structure

The frontend utilizes React. Data if accessed via fetch to the backend. Global State is handled by useContext. Context available is via user.js. Structure is as follows:

App.js
│   ├── Login.js
|   |       ├── LoginForm.js
|   |       └── SignUpForm.js
│   ├── Header.js
│   ├── EventList.js
|   |       └── EventCard.js
│   ├── MyList.js
|   |       └── MyCard.js
│   └── EditProfile

user.js
│ ├── App.js
| |   └── NavBar.js
| |        ├── MyAccount.js
| |        |    ├── Login.js
| |        |    |    ├── LoginForm.js
| |        |    |    └── SignUpForm.js
| |        |    ├── OwnedRentalList.js
| |        |    |    ├── AddProperties.js
| |        |    |    └── OwnedRentalCard.js
| |        |    |         └── OwnedRentalDetails.js
| |        |    |              ├── EditOwnedRentalDetails.js
| |        |    |              ├── OwnedPropertyBookings.js
| |        |    |              ├── OwnedRentalAmenities.js
| |        |    |              └── OwnedRentalReviews.js
| |        |    └── BookedRentalList.js
| |        |         └── BookedRentalCard.js
| |        |              ├── BookedRental.js
| |        |              └── BookedRentalBookings.js
| |        ├── RentalList.js
| |        |    ├── RentalCard.js 
| |        |    ├── RentalDetails.js
| |        |         └── RentalReview.js
| |        |              └── RentalReviewForm.js
| |        └── MyProfile.js
| |             ├── Edit UserProfile.js
| |             └── UpdatePassword.js.js

## Features

### Rental List
The rental list will showcase all rentals in the database. Each rental is mapped into a rental card. This will display the name, the cover picture and the daily rate of the rental. If the cover picture is linked to the rental details which will provide more information about the rental, such as the address, description, amenities, and reviews. There is an option to leave a review for the rental as well as book the rental. However, these actions are only available to logged in users. It will display a message to log in to perform the tasks. If logged in, a review form and a booking form will be displayed for the user to leave a review or book the rental.

### My Account
The site will check if there is a user. If there is none, the site will redirect to log in which will give the option to login if an existing user or sign up to create a user profile then login. Once logged in, my account will feature owned properties and booked vacation rentals

### Owned Properties
The Owned Properties list will display all properties by the owner in individual owned properties card. Upon clicking the image, the site will redirect to the owned property details page which will show the the property details, amenities, reviews, and bookings. The user as the owner can edit the property details as well as add or remove amenities.

### Vacation Bookings
The Vacation Bookings section will list all rentals the user as the traveler booked. It will display the start and date of the rental booked if it is just one booking or it will will show the bookings count if it is multiple bookings. When the image is clicked, the site will redirect to the booked rental page which will show the rental details, amenities and bookings. The user as the traveler can edit bookings as well as cancel bookings.

### My Profile
The My Profile page will show the user details such as email address and first and last name. The user can edit the profile in this page. The user can also update the password.