import Login from './Login'
import React, { useState, useContext } from "react";
import OwnedRentalList from './OwnedRentalList';
import BookedRentalList from './BookedRentalList';
import { UserContext } from '../context/user';


function MyAccount() {

  const { user, amenities }= useContext(UserContext) 

  console.log(amenities)

    if (user) {

        return (
          <div>
            <h2>My Properties</h2>
            <OwnedRentalList />
            <h2>My Vacations</h2>
            <BookedRentalList />
          </div>
        );
      } else {
        return <Login />;
    }
}

export default MyAccount