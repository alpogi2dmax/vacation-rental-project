import React, { useContext } from "react";
import BookedRentalCard from "./BookedRentalCard";
import { UserContext } from "../context/user";



function BookedRentalList({}) {

    const {bookedRentals} = useContext(UserContext)

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

export default BookedRentalList