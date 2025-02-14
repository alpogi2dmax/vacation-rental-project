import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { UserContext } from "../context/user";
import RentalReview from "./RentalReview";
import RentalReviewForm from "./RentalReviewForm";
import BookingRentalForm from "./BookingRentalForm";


function RentalDetails() {

    const [rental, setRental] = useState(null);
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true);
    const [ isReviewVisible, setIsReviewVisible] = useState(true)
    const [ isBookingVisible, setIsBookingVisible] = useState(true)
    const [showAllAmenities, setShowAllAmenities] = useState(false);

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
        setIsReviewVisible(!isReviewVisible)
    }

    const toggleAmenities = () => {
        setShowAllAmenities(prevState => !prevState);
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {rental ? 
                <div>
                    <h2>{rental.name}</h2>
                    <div className="rental-content">
                        <img className='rentalimage' src={rental.cover_pic} alt={rental.name} />
                        <div className='rentaldetails'>
                            <h3>Details</h3>
                            <ul>
                                <li>Address: {rental.address}</li>
                                <li>City: {rental.city}</li>
                                <li>State: {rental.state}</li>
                                <li>Daily Rate: ${rental.daily_rate}</li>
                                <li>Host: {rental.owner.first_name} {rental.owner.last_name}</li>
                                <li><img className='owner-thumbnail' src={rental.owner.profile_pic} /></li>
                            </ul>
                            <h3>Description</h3>
                            <p>{rental.description}</p>
                        </div>
                    </div>
                    {rental.amenities.length > 0 && (
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
                    )
                    }
                    
    
                    <div className="rental-section">
                        <h3>Reviews</h3>
                        <div className='review-container'>
                            {reviews.length === 0 ? <p>There are no reviews at this time.</p> : 
                                <div>
                                    {reviews.map(review => (
                                        <RentalReview key={review.id} review={review}/>
                                    ))}
                                </div>
                            }
                        </div>
                        <button className='button-23' onClick={() => setIsReviewVisible(!isReviewVisible)}>
                            {isReviewVisible ? 'Leave a review' : 'Cancel review'}
                        </button>
                        {!isReviewVisible && (
                            !user ? (
                                <p>Please log in!</p>
                            ) : (
                                <RentalReviewForm rental={rental} onAddReview={handleAddReview}/>
                            )
                        )}
                    </div>
    
                    <div className="rental-section">
                        <h3>Book This Place!</h3>
                        <div>
                            {!user ? (
                                <p>Please log in to book this place.</p>
                            ) : (
                                <BookingRentalForm key={rental.id} rental={rental}/>
                            )
                            }
                        </div>
                    </div>
                </div>
            : <p>Rental not found...</p>}
        </div>
    );
}

export default RentalDetails;