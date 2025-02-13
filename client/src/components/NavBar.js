import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../context/user";

function NavBar() {

    const navigate = useNavigate();
    const { user, setUser, setOwnedRentals, setBookedRentals } = useContext(UserContext)

    function handleLogOutClick() {
        setUser(null)
        setOwnedRentals([])
        setBookedRentals([])
        navigate('/')
    }

    return (
        <div>
            <h1>Vacation Rental</h1>
            <nav className='navbar' >
                <Link to="/myaccount" className='button-23'>My Account</Link>
                <Link to="/" className='button-23'>Rentals</Link>
                {user ? (
                    <button onClick={handleLogOutClick} className='button-23'>Logout</button>
                ) : (
                    <Link to="/myaccount" className='button-23'>
                        Login
                    </Link>
                )}
            </nav>
            {user ? <p>Welcome {user.first_name} {user.last_name}</p> : <p>Welcome Guest!</p>}
        </div>
    )
}

export default NavBar