import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function BookedRentalBooking({ booking, onDeleteBooking, onEditBooking }) {

    const [isVisible, setIsVisible] = useState(true)
    const [ startDate, setStartDate ] = useState(new Date(booking.start_date))
    const [ endDate, setEndDate ] = useState(new Date(booking.end_date))

    const handleDeleteClick =() => {
        onDeleteBooking(booking)
       
    }

    const handleEditClick = () => {
        setIsVisible(!isVisible)
    }

    function handleUpdateClick() {
        if (startDate > endDate ) {
            alert('Start Date cannot be greater than End Date')
        } else {
            const data = {
                bookingId: booking.id,
                startDate: startDate,
                endDate: endDate
            }
            onEditBooking(data)
            setIsVisible(!isVisible)
        }
    }


    

    // const startDate = new Date(booking.start_date);
                    const formattedStartDate = startDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    // const endDate = new Date(booking.end_date);
                    const formattedEndDate = endDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });

                    function formatDateToInput(date) {
                        const year = date.getFullYear();
                        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                        const day = String(date.getDate()).padStart(2, '0');
                        return `${year}-${month}-${day}`;
                      }
    
    if (booking.length === 0) return (<p>There are no bookings at this time.</p>)

    return (
        <tr>
            {isVisible ?
                <td>{formattedStartDate}</td> 
            : 
                <td>
                    <input 
                        type='date' 
                        value={formatDateToInput(startDate)} 
                        onChange={(e) => setStartDate(new Date(e.target.value))}
                    />
                </td>
            }
            {isVisible ?
                <td>{formattedEndDate}</td> 
            : 

                <td>
                    <input 
                        type='date' 
                        value={formatDateToInput(endDate)} 
                        onChange={(e) => setEndDate(new Date(e.target.value))}
                    />
                </td>

            }
            <td>
                {isVisible ?
                    <button onClick={handleEditClick}>Edit Booking</button>
                : 
                    <button onClick={handleUpdateClick}>Update Booking</button>
                }
            </td>
            <td>
                <button onClick={handleDeleteClick}>Cancel Booking</button>
            </td>
        </tr>
                     
    )

}

export default BookedRentalBooking