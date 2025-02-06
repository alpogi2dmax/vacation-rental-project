import './App.css'

function RentalCard({rental}) {

    console.log(rental.cover_pic)

    return(
        <div className='rentalcard'>
            <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>
            <p>{rental.name}</p>
            <p>${rental.daily_rate} per night</p>

        </div>
    )
}

export default RentalCard