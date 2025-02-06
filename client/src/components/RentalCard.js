import './App.css'

function RentalCard({rental}) {

    console.log(rental.owner)

    return(
        <div className='rentalcard'>
            <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>
            <p>{rental.name}</p>
            <p>${rental.daily_rate} per night</p>
        </div>
    )
}

export default RentalCard