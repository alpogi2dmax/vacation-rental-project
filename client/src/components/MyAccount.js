import Login from './Login'
import React, { useEffect, useState } from "react";
import OwnedRentalList from './OwnedRentalList';
import BookedRentalList from './BookedRentalList'


function MyAccount({user, ownedRentals, bookedRentals, onLogin}) {

    if (user) {

    // const [ownedRentals, setOwnedRentals] = useState(user.owned_rentals)

    console.log(user)

    return (
        <div>
            <h2>My Properties</h2>
            {/* {rental ? <h3>{rental.name}</h3> : <p>Loading...</p>} */}
            {ownedRentals ? <OwnedRentalList ownedRentals={ownedRentals} user={user}/> : <p>Loading...</p>}
            {/* <OwnedRentalList ownedRentals={ownedRentals} user={user}/> */}
            <h2>My Vacations</h2>
            <BookedRentalList bookedRentals={bookedRentals} />

        </div>
    )}

    else {return <Login onLogin={onLogin}/>}
    
}

export default MyAccount