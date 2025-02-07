import { date } from 'yup'
import './App.css'

function BookedRentalCard({rental}) {

    console.log(rental)
    

    return(
        <div className='bookedrentalcard'>
            <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>
            <p>{rental.name}</p>
            {rental.bookings.map(booking => {
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
            })}
        </div>
    )
}

export default BookedRentalCard