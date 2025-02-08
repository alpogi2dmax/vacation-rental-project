import Login from './Login'
import React, { useEffect, useState } from "react";
import OwnedRentalList from './OwnedRentalList';
import BookedRentalList from './BookedRentalList'


function MyAccount({user, ownedRentals, bookedRentals, onLogin}) {

    if (user) {
        console.log('User:', user); // Debug log
        console.log('Owned Rentals:', ownedRentals); // Debug log
    
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
        return <Login onLogin={onLogin} />;
    }
}

export default MyAccount