import './App.css'
import { Routes, Route, Link } from "react-router-dom"

function OwnedRentalCard({rental}) {

    return(
        <div className='rentalcard'>
            <Link to={`/ownedrentaldetails/${rental.id}`}>
                <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>  
            </Link>
            <p>{rental.name}</p>
            <p>${rental.daily_rate} per night</p>
        </div>
    )
}

export default OwnedRentalCard