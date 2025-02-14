import { useState } from 'react'

function OwnedRentalReviews({reviews}) {

    const [isExpanded, setIsExpanded] = useState(false);
    
    const toggleReview = () => {
        setIsExpanded(!isExpanded);
    };

    if (reviews.length === 0) return (<p>There are no reviews at this time.</p>)

    return (
        <div>
            {reviews.map(review => (
                <div className={`reviewcard ${isExpanded ? 'expanded' : ''}`} key={review.id}>
                    <div className="review-content">
                        <h3>{review.title}</h3>
                        <p>{review.review}</p>
                        <p>{review.reviewer.first_name}</p>
                    </div>
                    <span className="toggle-link" onClick={toggleReview}>
                        {isExpanded ? 'See less...' : 'See more...'}
                    </span>
                </div>    
            ))}
        </div>
    )
}

OwnedRentalReviews.defaultProps = {
    reviews: [],
  };

export default OwnedRentalReviews