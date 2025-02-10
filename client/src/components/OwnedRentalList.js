import React, { useEffect, useState, useContext } from "react";
import OwnedRentalCard from "./OwnedRentalCard";
import AddProperties from "./AddProperties";
import { UserContext } from "../context/user";


function OwnedRentalList() {


    const { user } = useContext(UserContext)
    const [ rentals, setRentals ] = useState(user.owned_rentals)
    const [isVisible, setIsVisible] = useState(false)

    function handleAddRental(newRental) {
        setRentals([...rentals, newRental])
        setIsVisible(!isVisible)
    }

    function handleToggle() {
        setIsVisible(!isVisible)
    }



    return (
        <div>
            <div className="clearfix">
            {rentals.map(rental => (
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