import React, { useContext } from "react";
import BookedRentalCard from "./BookedRentalCard";
import { UserContext } from "../context/user";



function BookedRentalList({}) {

    const {bookedRentals, filteredBookedRentals, setBookedRentals} = useContext(UserContext)

    // const [isVisible, setIsVisible] = useState(false)

    // function handleToggle() {
    //     setIsVisible(!isVisible)
    // }

    console.log(bookedRentals)

    if (bookedRentals.length === 0) {
        return (
            <p>There are no booked vacations at this point.</p>
        )
    }

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

export default BookedRentalList