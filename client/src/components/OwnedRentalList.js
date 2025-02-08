import React, { useEffect, useState } from "react";
import OwnedRentalCard from "./OwnedRentalCard";
import AddProperties from "./AddProperties";


function OwnedRentalList({ownedRentals, user}) {

    const [isVisible, setIsVisible] = useState(false)

    function handleToggle() {
        setIsVisible(!isVisible)
    }

    return (
        <div>
            <div className="clearfix">
            {ownedRentals.map(rental => (
                <OwnedRentalCard key={rental.id} rental={rental} />
            ))}
            </div>
            {!isVisible ? <button onClick={handleToggle}>Add Property</button>: ""}
            {isVisible && (<AddProperties user={user} onToggle={handleToggle}/>)}


        </div>
    )
}

export default OwnedRentalList