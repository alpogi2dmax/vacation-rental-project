import { Link } from "react-router-dom"

function NavBar() {

    return (
        <div>
            <h1>Vacation Rental</h1>
            <nav>
                <Link to="/myaccount">My Account</Link>
                <Link to="/rentals">Rentals</Link>
            </nav>
        </div>
    )
}

export default NavBar