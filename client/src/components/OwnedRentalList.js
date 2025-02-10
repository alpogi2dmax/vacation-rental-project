import React, { useState, useContext } from "react";
import OwnedRentalCard from "./OwnedRentalCard";
import AddProperties from "./AddProperties";
import { UserContext } from "../context/user";


function OwnedRentalList() {


    const { user, ownedRentals, setOwnedRentals } = useContext(UserContext)
    const rentals = ownedRentals
    const [isVisible, setIsVisible] = useState(false)

    function handleAddRental(newRental) {
        setOwnedRentals([...rentals, newRental])
        setIsVisible(!isVisible)
    }

    function handleToggle() {
        setIsVisible(!isVisible)
    }

    console.log(ownedRentals)
    console.log(user)

    return (
        <div>
            <div className="clearfix">
            {ownedRentals.map(rental => (
                <OwnedRentalCard key={rental.id} rental={rental} />
            ))}
            </div>
            {!isVisible ? <button onClick={handleToggle}>Add Property</button>: ""}
            {isVisible && (<AddProperties rentals={rentals} onAddRental={handleAddRental} onToggle={handleToggle}/>)}
            {/* {isVisible && (<AddProperties user={user} onToggle={handleToggle}/>)} */}


        </div>
    )
}

export default OwnedRentalList