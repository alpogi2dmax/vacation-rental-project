import Login from './Login'
import React, { useContext } from "react";
import OwnedRentalList from './OwnedRentalList';
import BookedRentalList from './BookedRentalList';
import { UserContext } from '../context/user';


function MyAccount() {

  const { user }= useContext(UserContext) 

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