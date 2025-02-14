import './App.css'
import { Link } from "react-router-dom"

function OwnedRentalCard({rental, onDeleteClick}) {

    function handleClick() {
        onDeleteClick(rental.id)
    }

    return(
        <div className='rentalcard'>
            <Link to={`/ownedrentals/${rental.id}`}>
                <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>  
            </Link>
            <p>{rental.name}</p>
            <p>${rental.daily_rate} per night</p>
            <button className='button-23' onClick={handleClick}>Remove Property</button>
        </div>
    )
}

export default OwnedRentalCard