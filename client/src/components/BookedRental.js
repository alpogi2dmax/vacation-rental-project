

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

    const formatDate = (date) => { 
        const d = new Date(date); 
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); 
        const day = d.getDate().toString().padStart(2, '0'); 
        const year = d.getFullYear(); 
        return `${month}/${day}/${year}`; 
    };

    function handleEditBooking(bookingData) {
        console.log(bookingData)
        fetch(`http://localhost:5555/bookings/${bookingData.bookingId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                start_date: formatDate(bookingData.startDate),
                end_date: formatDate(bookingData.endDate),
                rental_id: rental.id,
                traveler_id: user.id
            }),
        })
        .then((r) => r.json())
        .then(data => {
            console.log(data)
            setRental(prevRental => {
                const updatedRental = {
                    ...prevRental,
                    bookings: prevRental.bookings.map(booking => 
                        booking.id === data.id ? data : booking
                    )
                };
                handleUpdateBookedRentals(updatedRental);
                return updatedRental
            })
        })
    } 


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
                                <th>Edit Booking</th>
                                <th>Cancel Booking</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rental.bookings.map(booking => (
                                <BookedRentalBooking key={booking.id} booking={booking} onDeleteBooking={handleDeleteBooking} onEditBooking={handleEditBooking}/>
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