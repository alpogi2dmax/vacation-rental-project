import { Link } from "react-router-dom"

function NavBar({onLogOut}) {

    function handleLogOutClick() {
        onLogOut()
    }

    return (
        <div>
            <h1>Vacation Rental</h1>
            <nav>
                <Link to="/myaccount">My Account</Link>
                <Link to="/">Rentals</Link>
                <button onClick={handleLogOutClick}>Logout</button>
            </nav>
        </div>
    )
}

export default NavBar