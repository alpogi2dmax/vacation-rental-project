import Login from './Login'
import React, { useState, useContext } from "react";
import OwnedRentalList from './OwnedRentalList';
import BookedRentalList from './BookedRentalList';
import { UserContext } from '../context/user';


function MyAccount() {

  const { user, setUser, ownedRentals } = useContext(UserContext) 
  const [loading, setLoading] = useState(false)

    if (user) {

      console.log(user.owned_rentals)
      console.log(ownedRentals)
    
        return (
          <div>
            <h2>My Properties</h2>
            <OwnedRentalList />
            <h2>My Vacations</h2>
            <BookedRentalList bookedRentals={user.rentals} />
          </div>
        );
      } else {
        return <Login onLogin={setUser} />;
    }
}

export default MyAccount