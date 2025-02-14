import './App.css'
import { Routes, Route, Link } from "react-router-dom"

function RentalCard({rental}) {

    return(
        <div className='rentalcard'>
            <Link to={`/rentals/${rental.id}`}>
                <img className='imagecard' src={rental.cover_pic} alt={rental.cover_pic}/>
            </Link>
            <p>{rental.name}</p>
            <p>${rental.daily_rate} per night</p>
        </div>
    )
}

export default RentalCard
