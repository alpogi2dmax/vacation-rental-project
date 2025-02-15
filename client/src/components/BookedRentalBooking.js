import { useState } from "react";

function BookedRentalBooking({ booking, onDeleteBooking, onEditBooking }) {

    const [isVisible, setIsVisible] = useState(true)
    const [ startDate, setStartDate ] = useState(booking.start_date)
    const [ endDate, setEndDate ] = useState(booking.end_date)

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

    const formatDateForInput = (date) => { 
        const [year, month, day] = date.slice(0, 10).split('-'); 
        const d = new Date(Date.UTC(year, month - 1, day)); 
        const formattedDate = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, '0')}-${String(d.getUTCDate()).padStart(2, '0')}`; 
        return formattedDate; };


    const formatDateForDisplay = (date) => { 
        const [year, month, day] = date.slice(0, 10).split('-'); 
        const d = new Date(Date.UTC(year, month - 1, day)); 
        const formattedDate = `${String(d.getUTCMonth() + 1).padStart(2, '0')}/${String(d.getUTCDate()).padStart(2, '0')}/${d.getUTCFullYear()}`; 
        return formattedDate; };

    const handleChangeStartDate = (e) => {
        setStartDate(e)
    }

    const handleChangeEndDate = (e) => {
        setEndDate(e)
    }

    
    if (booking.length === 0) return (<p>There are no bookings at this time.</p>)

    return (
        <tr>
            {isVisible ?
                <td>{formatDateForDisplay(startDate)}</td> 
            : 
                <td>
                    <input 
                        type='date' 
                        value={formatDateForInput(startDate)} 
                        onChange={(e) => handleChangeStartDate(e.target.value)}
                    />
                </td>
            }
            {isVisible ?
                <td>{formatDateForDisplay(endDate)}</td> 
            : 

                <td>
                    <input 
                        type='date' 
                        value={formatDateForInput(endDate)} 
                        onChange={(e) => handleChangeEndDate(e.target.value)}
                    />
                </td>

            }
            <td>
                {isVisible ?
                    <button className='button-23' onClick={handleEditClick}>Edit Booking</button>
                : 
                    <button className='button-23' onClick={handleUpdateClick}>Update Booking</button>
                }
            </td>
            <td>
                <button className='button-23' onClick={handleDeleteClick}>Cancel Booking</button>
            </td>
        </tr>
                     
    )

}

export default BookedRentalBooking