import { Link, useNavigate } from "react-router-dom"
import { useContext } from "react";
import { UserContext } from "../context/user";

function NavBar() {

    const navigate = useNavigate();
    const { user, setUser } = useContext(UserContext)

    function handleLogOutClick() {
        setUser(null)
        navigate('/')
    }

    return (
        <div >
            <h1>Vacation Rental</h1>
            <nav className='navbar' >
                <Link to="/myaccount" className='navbarlinks'>My Account</Link>
                <Link to="/" className='navbarlinks'>Rentals</Link>
                {/* <button onClick={handleLogOutClick} className='navbarlinks'>Logout</button> */}
                {user ? (
                    <button onClick={handleLogOutClick} className='navbarlinks'>Logout</button>
                ) : (
                    <Link to="/myaccount" className='navbarlinks'>
                        Login
                    </Link>
                )}
            </nav>
            {user ? <p>Welcome {user.first_name} {user.last_name}</p> : <p>Welcome Guest!</p>}
        </div>
    )
}

export default NavBar