import { useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function BookedRentalBooking({ booking }) {

    // const { handleDeleteBooking } = useContext(UserContext)
    const navigate = useNavigate()

    function handleDeleteClick() {
        
        fetch(`/bookings/${booking.id}`, {
            method: "DELETE",
        })
        .then(() => {
            // handleDeleteBooking()
            navigate('/')

        })
    }



    // function handleDelete() {
    //     fetch(`/users/${user.id}`, {
    //         method: "DELETE",
    //     })
    //     .then(() => onLogOut())
    // }

    const startDate = new Date(booking.start_date);
                    const formattedStartDate = startDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const endDate = new Date(booking.end_date);
                    const formattedEndDate = endDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

    if (booking.length === 0) return (<p>There are no bookings at this time.</p>)

    return (
        <tr>
            <td>{formattedStartDate}</td>
            <td>{formattedEndDate}</td>
            <td>
                <button onClick={handleDeleteClick}>Cancel Booking</button>
            </td>
        </tr>
                     
    )

}

export default BookedRentalBooking