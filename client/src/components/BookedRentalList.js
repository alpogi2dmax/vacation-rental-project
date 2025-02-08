import React, { useEffect, useState } from "react";
import BookedRentalCard from "./BookedRentalCard";
import OwnedRentalCard from "./OwnedRentalCard";
import AddProperties from "./AddProperties";


function OwnedRentalList({bookedRentals, user}) {

    // const [isVisible, setIsVisible] = useState(false)

    // function handleToggle() {
    //     setIsVisible(!isVisible)
    // }

    return (
        <div>
            <div className="clearfix">
            {bookedRentals.map(rental => (
                <BookedRentalCard key={rental.id} rental={rental} />
            ))}
            </div>
            {/* {!isVisible ? <button onClick={handleToggle}>Add Property</button>: ""}
            {isVisible && (<AddProperties user={user} onToggle={handleToggle}/>)} */}


        </div>
    )
}

export default OwnedRentalList