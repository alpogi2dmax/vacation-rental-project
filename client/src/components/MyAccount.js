import Login from './Login'
import React, { useEffect, useState, useContext } from "react";
import OwnedRentalList from './OwnedRentalList';
import BookedRentalList from './BookedRentalList';
import { UserContext } from '../context/user';


function MyAccount() {

  const { user, setUser } = useContext(UserContext) 
  const [loading, setLoading] = useState(false)

    if (user) {
    
        return (
          <div>
            <h2>My Properties</h2>
            {user.owned_rentals.length > 0 ? (
              <OwnedRentalList ownedRentals={user.owned_rentals} user={user} />
            ) : (
              <p>Loading...</p>
            )}
            <h2>My Vacations</h2>
            <BookedRentalList bookedRentals={user.rentals} />
          </div>
        );
      } else {
        return <Login onLogin={setUser} />;
    }
}

export default MyAccount