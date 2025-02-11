import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RentalReview from "./RentalReview";

function RentalDetails() {

    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/rentals/${id}`)
            .then(r => r.json())
            .then(data => {
                setRental(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {rental ? 
                <div>
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
                        </ul>
                    </div>
                    <h3>Amenities</h3>
                    <ul>
                        {rental.amenities.map(amenity => (
                            <li key={amenity.id}>{amenity.name}</li>
                        ))}
                    </ul> 
                    <h3>Reviews: </h3>
                    {rental.reviews.map(review => (
                        <RentalReview key={review.id} review={review}/>
                    ))}
                </div>
            
            : <p>Loading...</p>}
        </div>
    );
}

export default RentalDetails;