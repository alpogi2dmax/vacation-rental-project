
function RentalReview({review}) {



    return (
        
        <div className='reviewcard'>
            
                    <h3>{review.title}</h3>
                    <p>{review.review}</p>
                    <p>{review.reviewer.first_name}</p>
                
        </div>
    )

}


export default RentalReview