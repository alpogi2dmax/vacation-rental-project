import { Link, useNavigate } from "react-router-dom"

function NavBar({user, onLogOut}) {

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
                {/* <button onClick={handleLogOutClick} className='navbarlinks'>Logout</button> */}
                {user ? (
                    <button onClick={handleLogOutClick} className='navbarlinks'>Logout</button>
                ) : (
                    <Link to="/myaccount" className='navbarlinks'>
                        Login
                    </Link>
                )}
            </nav>
        </div>
    )
}

export default NavBar