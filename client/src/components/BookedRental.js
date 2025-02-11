

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import BookedRentalBooking from "./BookedRentalBooking";


function BookedRental() {

    const { user, bookedRentals, filteredBookedRentals, handleUpdateBookedRentals, setBookedRentals } = useContext(UserContext)
    const { id } = useParams();
    const [rental, setRental] = useState(null)
    // const [bookings, setBookings] = useState([])
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (user && bookedRentals) {
            const selectedRental = bookedRentals.find(or => or.id == id);
            setRental(selectedRental);
            // setBookings(selectedRental.bookings)
        } else {
            console.log("User or rentals not ready yet.");
        }
    }, [id, user, bookedRentals]);


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
            const updatedSelectedRentalBookings = rental.bookings.map(b => b.id === data.id ? data : b)
            const updatedSelectedRental = {...rental, bookings: updatedSelectedRentalBookings}
            setBookedRentals(bookedRentals.map(br => br.id === updatedSelectedRental.id ? updatedSelectedRental : br))
           
        })
    } 


    function handleDeleteBooking(booking) {
        console.log(booking);
        fetch(`/bookings/${booking.id}`, {
            method: "DELETE",
        })
        .then(() => {
            const selectedBookedRental = bookedRentals.find(br => br.id === booking.rental_id)
            const updatedBookedRentalBookings = selectedBookedRental.bookings.filter(b => b.id !== booking.id)
            const updatedSelectedBookedRental = {...selectedBookedRental, bookings: updatedBookedRentalBookings}
            const updatedBookedRentals = []
            bookedRentals.forEach(br => {
                if (br.id !== booking.rental_id) {
                    updatedBookedRentals.push(br)
                } else {
                    if (updatedBookedRentalBookings.length !== 0) {
                        updatedBookedRentals.push(updatedSelectedBookedRental)
                    }
                }
                setBookedRentals(updatedBookedRentals)
            })
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
                    {rental.bookings.length !== 0 ? (
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
                    </table>)
                    :
                    (<p>No bookings at this time.</p>)
                        }
                    {/* <h3>Reviews: </h3>
                    <OwnedRentalReviews reviews={rental.reviews} /> */}
                </div>
            
            : <p>Loading...</p>}
        </div>
    )
}

export default BookedRental