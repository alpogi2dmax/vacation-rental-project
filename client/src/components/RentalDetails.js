import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import RentalReview from "./RentalReview";
import RentalReviewForm from "./RentalReviewForm";


function RentalDetails() {

    const [rental, setRental] = useState(null);
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);
    const [ isReviewVisible, setIsReviewVisible] = useState(true)
    const { id } = useParams();
    const { user } = useContext(UserContext)

    useEffect(() => {
        fetch(`/rentals/${id}`)
            .then(r => r.json())
            .then(data => {
                setRental(data);
                setReviews(data.reviews || [])
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, [id]);

    function handleAddReview(newReview) {
        setReviews([...reviews, newReview])
    }

    console.log(reviews)

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
                    {reviews.length === 0 ? <p>There are no reviews at this time.</p> : reviews.map(review => (
                        <RentalReview key={review.id} review={review}/>
                    ))}
                    <button onClick={() => setIsReviewVisible(!isReviewVisible)}>Leave a review:</button>
                    {!isReviewVisible && (
                        !user ? (
                            <p>Please log in!</p>
                        ) : (
                            <RentalReviewForm rental={rental} onAddReview={handleAddReview}/>
                        )
                    )}
                </div>
            
            : <p>Loading...</p>}
        </div>
    );
}

export default RentalDetails;