import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import OwnedPropertyBookings from "./OwnedPropertyBookings";
import OwnedRentalReviews from "./OwnedRentalReviews";
import OwnedRentalAmenities from "./OwnedRentalAmenities";
import EditOwnedRentalDetails from "./EditOwnedRentalDetails";
import { UserContext } from "../context/user";


function OwnedRentalDetails() {

    const { user, ownedRentals, setOwnedRentals } = useContext(UserContext)
    const [rental, setRental] = useState(null)
    const { id } = useParams();
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        if (user && ownedRentals) {
            const selectedRental = ownedRentals.find(or => or.id == id);
            setRental(selectedRental);
        } else {
            console.log("User or rentals not ready yet.");
        }
    }, [id, user]);

    function handleToggle() {
        setIsVisible(!isVisible)
    }

    function rentalAppendAmenity(amenityID) {
        const data = {id: amenityID}
        fetch(`http://localhost:5555/rentalamenities/${rental.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: amenityID
            }),
        })
        .then((r) => r.json())
        .then(data => {
            setRental(data)
            setOwnedRentals(ownedRentals.map(ownedRental => {
                if (ownedRental.id === data.id) {
                    return data
                } 
                return ownedRental
            }))
        })
    }

    function rentalRemoveAmenity(amenityID) {
        const data = {id: amenityID}
        console.log(rental)
        console.log(data)
        fetch(`http://localhost:5555/rentalamenities/${rental.id}/remove`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: amenityID
            }),
        })
        .then((r) => r.json())
        .then(data => {
            console.log(data)
            setRental(data)
            setOwnedRentals(ownedRentals.map(ownedRental => {
                if (ownedRental.id === data.id) {
                    return data
                } 
                return ownedRental
            }))
        })
    }

    if (!user) {
        return <p>Please log in to see this information...</p>
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
                                    </ul>
                                <h3>Description</h3>
                                <p>{rental.description}</p>
                            </div>
                        </div>
                    </div>
                    }
                    {isVisible && <EditOwnedRentalDetails rental={rental} onToggle={handleToggle} onRental={setRental}/>}
                    <button className='button-23' onClick={handleToggle}>{!isVisible ? 'Edit Rental Details' : 'Cancel'}</button>
                    <div className='rental-section'>
                        <h3>Amenities</h3>
                        <OwnedRentalAmenities rentalAmenities={rental.amenities} rentalId={rental.id} onRentalAppendAmenity={rentalAppendAmenity} onRentalRemoveAmenity={rentalRemoveAmenity}/>
                    </div>
                    <h3>Bookings: </h3>
                    <OwnedPropertyBookings bookings={rental.bookings}/>
                    <h3>Reviews: </h3>
                    <OwnedRentalReviews reviews={rental.reviews} />
                </div>
            
            : <p>Unauthorized...</p>}
        </div>
    )
}

export default OwnedRentalDetails