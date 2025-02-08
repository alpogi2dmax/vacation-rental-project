import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import OwnedPropertyBookings from "./OwnedPropertyBookings";
import OwnedRentalReviews from "./OwnedRentalReviews";

function OwnedRentalDetails() {

    const [rental, setRental] = useState(null)
    const { id } = useParams();

    useEffect(() => {
        fetch(`/rentals/${id}`)
        .then(r => r.json())
        .then(data => {
            setRental(data);
        })
        .catch(error => console.error('Fetch error:', error));
    }, [id]); // Include id as a dependency

    return (
        <div>
            {rental ? 
                <div>
                    <h2>{rental.name}</h2>
                    <img src={rental.cover_pic} alt={rental.name} />
                    <h3>Description</h3>
                    <p>{rental.description}</p>
                    <h3>Details</h3>
                    <ul>
                        <li>Address: {rental.address}</li>
                        <li>City: {rental.city}</li>
                        <li>State: {rental.state}</li>
                        <li>Daily Rate: ${rental.daily_rate}</li>
                    </ul>
                    <h3>Bookings: </h3>
                    <OwnedPropertyBookings bookings={rental.bookings}/>
                    <h3>Reviews: </h3>
                    <OwnedRentalReviews reviews={rental.reviews}/>

                    
                </div>
            
            : <p>Loading...</p>}
        </div>
    )
}

export default OwnedRentalDetails