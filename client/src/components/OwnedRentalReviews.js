

function OwnedRentalReviews({reviews}) {

    return (
        
        <div>
            {reviews.map(review => (
                <div key={review.id}>
                    <h3>{review.title}</h3>
                    <p>{review.review}</p>
                    <p>{review.reviewer.first_name}</p>
                </div>
            ))}
        </div>
    )

}

export default OwnedRentalReviews