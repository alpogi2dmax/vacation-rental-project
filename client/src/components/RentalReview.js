import { useState } from "react";


function RentalReview({review}) {

    const [isExpanded, setIsExpanded] = useState(false);

    const toggleReview = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        
        <div className={`reviewcard ${isExpanded ? 'expanded' : ''}`}>
            <div className="review-content">
                <h3>{review.title}</h3>
                <p>{review.review}</p>
                <p>{review.reviewer.first_name}</p>
            </div>
            <span className="toggle-link" onClick={toggleReview}>
                {isExpanded ? 'See less...' : 'See more...'}
            </span>
        </div>
    )

}


export default RentalReview