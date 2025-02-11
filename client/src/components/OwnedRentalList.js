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

    function handleDeleteClick(deletedRentalId) {
        fetch(`/rentals/${deletedRentalId}`, {
            method: "DELETE",
        })
        .then(() => setOwnedRentals(ownedRentals.filter(ownedRental => ownedRental.id !== deletedRentalId)))
    }



    

    return (
        <div>
            <div className="clearfix">
            {ownedRentals.length === 0 ? 
                <p>There are no properties at this time.</p>
            : 
                ownedRentals.map(rental => (
                    <OwnedRentalCard key={rental.id} rental={rental} onDeleteClick={handleDeleteClick} />
                ))
            }
            </div>
            {!isVisible ? <button onClick={handleToggle}>Add Property</button>: ""}
            {isVisible && (<AddProperties onAddRental={handleAddRental} onToggle={handleToggle}/>)}


        </div>
    )
}

export default OwnedRentalList