

import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { UserContext } from "../context/user";
import BookedRentalBooking from "./BookedRentalBooking";


function BookedRental() {

    const { user, bookedRentals, filteredBookedRentals, handleUpdateBookedRentals, setBookedRentals } = useContext(UserContext)
    const { id } = useParams();
    const [rental, setRental] = useState(null)
    const [showAllAmenities, setShowAllAmenities] = useState(false);
    const navigate = useNavigate();

    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (user && bookedRentals) {
            const selectedRental = bookedRentals.find(or => or.id == id);
            setRental(selectedRental);
            console.log(selectedRental)
        } else {
            console.log("User or rentals not ready yet.");
        }
    }, [id, user, bookedRentals]);

    const formatDate = (date) => { 
        const d = new Date(date); 
        const month = (d.getMonth() + 1).toString().padStart(2, '0'); 
        const day = d.getDate().toString().padStart(2, '0'); 
        const year = d.getFullYear(); 
        return `${month}/${day}/${year}`; 
    };

    const handleEditBooking = (bookingData) => {
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
            const selectedBookedRental = bookedRentals.find(br => br.id === rental.id)
            console.log(selectedBookedRental)
            const updatedSelectedRentalBookings = selectedBookedRental.bookings.map(b => b.id === data.id ? data : b)
            const updatedSelectedRental = {...selectedBookedRental, bookings: updatedSelectedRentalBookings}
            setBookedRentals(bookedRentals.map(br => br.id === updatedSelectedRental.id ? updatedSelectedRental : br))
           
        })
    } 


    const handleDeleteBooking = (booking) => {
        console.log(booking);
        fetch(`/bookings/${booking.id}`, {
            method: "DELETE",
        })
        .then(() => {
        })  
            const selectedBookedRental = bookedRentals.find(br => br.id === rental.id)
            const updatedBookedRentalBookings = selectedBookedRental.bookings.filter(b => b.id !== booking.id)
            const updatedSelectedBookedRental = {...rental, bookings: updatedBookedRentalBookings}
            const updatedBookedRentals = []
            bookedRentals.forEach(br => {
                if (br.id !== rental.id) {
                    updatedBookedRentals.push(br)
                } else {
                    if (updatedBookedRentalBookings.length !== 0) {
                        updatedBookedRentals.push(updatedSelectedBookedRental)
                    }
                }
            })
            setBookedRentals(updatedBookedRentals)
            navigate('/myaccount')
    }

    const toggleAmenities = () => {
        setShowAllAmenities(prevState => !prevState);
    };


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
                        <div className="rental-content">
                            <img className='rentalimage' src={rental.cover_pic} alt={rental.cover_pic} />
                            <div className='rentaldetails'>
                                <h3>Details</h3>
                                    <ul>
                                        <li>Address: {rental.address}</li>
                                        <li>City: {rental.city}</li>
                                        <li>State: {rental.state}</li>
                                        <li>Daily Rate: ${rental.daily_rate}</li>
                                        <li>Owner: {rental.owner.first_name} {rental.owner.last_name}</li>
                                    </ul>
                                <h3>Description</h3>
                                <p>{rental.description}</p>
                            </div>
                        </div>
                    </div>
                    }
                    <div className="rental-section">
                        <h3>Amenities</h3>
                            <ul className={`amenities ${showAllAmenities ? 'expanded' : ''}`}>
                                {rental.amenities.map(amenity => (
                                    <li key={amenity.id}>{amenity.name}</li>
                                ))}
                            </ul> 
                            <span className="toggle-link" onClick={toggleAmenities}>
                                {showAllAmenities ? 'See less...' : 'See more...'}
                            </span>
                    
                    </div>
                    <h3>Bookings: </h3>
                    {rental.bookings.length !== 0 ? (
                    <table>
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