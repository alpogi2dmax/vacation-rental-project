import React, { useEffect, useState } from "react";
import RentalCard from "./RentalCard";


function RentalList() {

    const [rentals, setRentals] = useState([])

    useEffect(() => {
        fetch('/rentals')
        .then(r => r.json())
        .then(data => setRentals(data))
      }, [])

    return (
        <div>
            {rentals.map(rental => (
                <RentalCard key={rental.id} rental={rental} />
            ))}
        </div>
    )
}

export default RentalList