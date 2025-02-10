

function OwnedRentalReviews({reviews}) {

    if (reviews.length === 0) return (<p>There are no reviews at this time.</p>)

    console.log(reviews)

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

OwnedRentalReviews.defaultProps = {
    reviews: [],
  };

export default OwnedRentalReviews