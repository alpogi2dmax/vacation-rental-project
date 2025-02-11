

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import BookedRentalBooking from "./BookedRentalBooking";


function BookedRental() {

    const { user, bookedRentals, filteredBookedRentals, handleUpdateBookedRentals } = useContext(UserContext)
    const { id } = useParams();
    const [rental, setRental] = useState(null)
    // const [bookings, setBookings] = useState([])
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (user && filteredBookedRentals) {
            const selectedRental = filteredBookedRentals.find(or => or.id == id);
            setRental(selectedRental);
            // setBookings(selectedRental.bookings)
        } else {
            console.log("User or rentals not ready yet.");
        }
    }, [id, user, filteredBookedRentals]);


    // function handleToggle() {
    //     setIsVisible(!isVisible)
    // }

    function handleDeleteBooking(bookingId) {
        console.log(bookingId);
        fetch(`/bookings/${bookingId}`, {
            method: "DELETE",
        })
        .then(() => {
            setRental(prevRental => {
                const updatedRental = {
                    ...prevRental,
                    bookings: prevRental.bookings.filter(booking => booking.id !== bookingId)
                };
                // Update the global state
                handleUpdateBookedRentals(updatedRental);
                return updatedRental; // Return the updated rental for local state
            });
            navigate('/myaccount')
        });
    }


    if (!user) {
        return <p>Loading user data...</p>
    }

    return (
        <div>
            {rental ? 
                <div>
                    {!isVisible &&
                    <div>
                        <h2>{rental.name}</h2>
                        <img src={rental.cover_pic} alt={rental.cover_pic} />
                        <h3>Description</h3>
                        <p>{rental.description}</p>
                        <h3>Details</h3>
                        <ul>
                            <li>Address: {rental.address}</li>
                            <li>City: {rental.city}</li>
                            <li>State: {rental.state}</li>
                            <li>Daily Rate: ${rental.daily_rate}</li>
                            <li>Owner: {rental.owner.first_name} {rental.owner.last_name}</li>
                        </ul>
                    </div>
                    }
                    
                    <h3>Amenities</h3>
                    {rental.amenities && rental.amenities.length > 0 ? (
                        <div>
                            <ul>
                                {rental.amenities.map((amenity, index) => (
                                <li key={amenity.id || index}>{amenity.name}</li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <p>No specific amenities for this rental.</p>
                    )}
                    <h3>Bookings: </h3>
                    <table style={{ width: "100%" }}>
                        <thead>
                            <tr>
                                <th>Start Date</th>
                                <th>End Date</th>
                                <th>Cancel Booking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rental.bookings.map(booking => (
                                <BookedRentalBooking key={booking.id} booking={booking} onDeleteBooking={handleDeleteBooking}/>
                            ))}
                        </tbody>
                    </table>
                    {/* <h3>Reviews: </h3>
                    <OwnedRentalReviews reviews={rental.reviews} /> */}
                </div>
            
            : <p>Loading...</p>}
        </div>
    )
}

export default BookedRental