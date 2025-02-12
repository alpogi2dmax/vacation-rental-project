import { date } from 'yup'
import { Link } from 'react-router-dom'
import './App.css'

function BookedRentalCard({rental}) {

    console.log(rental.bookings)
    

    return(
        <div className='bookedrentalcard'>
            <Link to={`/bookedrental/${rental.id}`}>
                <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>  
            </Link>
            <p>{rental.name}</p>
            {rental.bookings.length > 1 ? 
                <p>{rental.bookings.length} Booked Vacations</p> 
                : 
                <div>
                    <p>Start Date: {new Date(rental.bookings[0].start_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                    <p>End Date: {new Date(rental.bookings[0].end_date).toLocaleDateString('en-US', {year: 'numeric', month: 'long', day: 'numeric'})}</p>
                </div>
            }

            {/* {rental.bookings.map(booking => {
                const startDate = new Date(booking.start_date);
                const formattedStartDate = startDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });
                const endDate = new Date(booking.end_date);
                const formattedEndDate = endDate.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                });

                return (
                    <div key={booking.id}>
                        <p>Start Date: {formattedStartDate}</p>
                        <p>End Date: {formattedEndDate}</p>
                    </div>
                );
            })} */}
        </div>
    )
}

export default BookedRentalCard