import { Link, useNavigate } from "react-router-dom"

function NavBar({onLogOut}) {

    const navigate = useNavigate();

    function handleLogOutClick() {
        onLogOut()
        navigate('/')
    }

    return (
        <div >
            <h1>Vacation Rental</h1>
            <nav className='navbar' >
                <Link to="/myaccount" className='navbarlinks'>My Account</Link>
                <Link to="/" className='navbarlinks'>Rentals</Link>
                <button onClick={handleLogOutClick} className='navbarlinks'>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar