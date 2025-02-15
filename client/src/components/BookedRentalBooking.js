import { useState, useContext } from "react";
import { UserContext } from "../context/user";
import { useNavigate } from "react-router-dom";

function BookedRentalBooking({ booking, onDeleteBooking, onEditBooking }) {

    const [isVisible, setIsVisible] = useState(true)
    const [ startDate, setStartDate ] = useState(booking.start_date)
    const [ endDate, setEndDate ] = useState(booking.end_date)

    console.log(booking.start_date.slice(0, 10))
    console.log(booking.end_date)
    console.log(startDate.slice(0, 10))
    console.log(endDate)

    const handleDeleteClick =() => {
        onDeleteBooking(booking)
       
    }

    const handleEditClick = () => {
        setIsVisible(!isVisible)
    }

    function handleUpdateClick() {
        console.log(startDate)
        console.log(endDate)
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

                const formatDateToUTC = (dateString) => {
                    const dateParts = dateString.split('-');
                    const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
                
                    const year = date.getUTCFullYear();
                    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
                    const day = String(date.getUTCDate()).padStart(2, '0');
                
                    return `${year}-${month}-${day}T00:00:00Z`;
                };

    // const formatDateForDisplay = (dateString) => {
    //     const date = new Date(dateString);
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const year = date.getFullYear();
    //     return `${month}/${day}/${year}`;
    // };

    // const formatDateForInput = (dateString) => {
    //     const date = new Date(dateString);
    //     const year = date.getFullYear();
    //     const month = String(date.getMonth() + 1).padStart(2, '0');
    //     const day = String(date.getDate()).padStart(2, '0');
    //     return `${year}-${month}-${day}`;
    // };

    const formatDateForBackend = (date) => { 
        const [year, month, day] = date.split('-'); 
        const d = new Date(Date.UTC(year, month - 1, day)); 
        const formattedDate = `${String(d.getUTCMonth() + 1)
            .padStart(2, '0')}/${String(d.getUTCDate())
                .padStart(2, '0')}/${d.getUTCFullYear()}`; 
                return formattedDate; };

                const formatDateForInput = (date) => { 
                    const [year, month, day] = date.slice(0, 10).split('-'); 
                    const d = new Date(Date.UTC(year, month - 1, day)); 
                    const formattedDate = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1)
                                .padStart(2, '0')}-${String(d.getUTCDate())
                            .padStart(2, '0')}`; 
                            // const formattedDate = `${String(d.getUTCMonth() + 1)
                            //     .padStart(2, '0')}/${String(d.getUTCDate())
                            //         .padStart(2, '0')}/${d.getUTCFullYear()}`; 
                            return formattedDate; };


                const formatDateForDisplay = (date) => { 
                    const [year, month, day] = date.slice(0, 10).split('-'); 
                    const d = new Date(Date.UTC(year, month - 1, day)); 
                    const formattedDate = `${String(d.getUTCMonth() + 1)
                        .padStart(2, '0')}/${String(d.getUTCDate())
                            .padStart(2, '0')}/${d.getUTCFullYear()}`; 
                            return formattedDate; };

    const handleChangeStartDate = (e) => {
        console.log(e)
        setStartDate(e)
    }

    const handleChangeEndDate = (e) => {
        console.log(e)
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

// import { useState, useContext } from "react";
// import { UserContext } from "../context/user";
// import { useNavigate } from "react-router-dom";

// function BookedRentalBooking({ booking, onDeleteBooking, onEditBooking }) {

//     const [isVisible, setIsVisible] = useState(true)
//     const [ startDate, setStartDate ] = useState(booking.start_date)
//     const [ endDate, setEndDate ] = useState(booking.end_date)

//     console.log(booking.start_date)
//     console.log(booking.end_date)
//     console.log(startDate)
//     console.log(endDate)

//     const handleDeleteClick =() => {
//         onDeleteBooking(booking)
       
//     }

//     const handleEditClick = () => {
//         setIsVisible(!isVisible)
//     }

//     function handleUpdateClick() {
//         console.log(startDate)
//         console.log(endDate)
//         if (startDate > endDate ) {
//             alert('Start Date cannot be greater than End Date')
//         } else {
//             const data = {
//                 bookingId: booking.id,
//                 startDate: startDate,
//                 endDate: endDate
//             }
//             onEditBooking(data)
//             setIsVisible(!isVisible)
//         }
//     }

//     const formatDate = (date) => { 
//         const [year, month, day] = date.split('-'); 
//         const d = new Date(Date.UTC(year, month - 1, day)); 
//         const formattedDate = `${String(d.getUTCMonth() + 1)
//             .padStart(2, '0')}/${String(d.getUTCDate())
//                 .padStart(2, '0')}/${d.getUTCFullYear()}`; 
//                 return formattedDate; };

//                 const formatDateToUTC = (dateString) => {
//                     const dateParts = dateString.split('-');
//                     const date = new Date(Date.UTC(dateParts[0], dateParts[1] - 1, dateParts[2]));
                
//                     const year = date.getUTCFullYear();
//                     const month = String(date.getUTCMonth() + 1).padStart(2, '0');
//                     const day = String(date.getUTCDate()).padStart(2, '0');
                
//                     return `${year}-${month}-${day}T00:00:00Z`;
//                 };

//     const formatDateForDisplay = (dateString) => {
//         const date = new Date(dateString);
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         const year = date.getFullYear();
//         return `${month}/${day}/${year}`;
//     };

//     const formatDateForInput = (dateString) => {
//         const date = new Date(dateString);
//         const year = date.getFullYear();
//         const month = String(date.getMonth() + 1).padStart(2, '0');
//         const day = String(date.getDate()).padStart(2, '0');
//         return `${year}-${month}-${day}`;
//     };

//     const formatDateForBackend = (date) => { 
//         const [year, month, day] = date.split('-'); 
//         const d = new Date(Date.UTC(year, month - 1, day)); 
//         const formattedDate = `${String(d.getUTCMonth() + 1)
//             .padStart(2, '0')}/${String(d.getUTCDate())
//                 .padStart(2, '0')}/${d.getUTCFullYear()}`; 
//                 return formattedDate; };

    
//     if (booking.length === 0) return (<p>There are no bookings at this time.</p>)

//     return (
//         <tr>
//             {isVisible ?
//                 <td>{formatDateForDisplay(startDate)}</td> 
//             : 
//                 <td>
//                     <input 
//                         type='date' 
//                         value={formatDateForInput(startDate)} 
//                         onChange={(e) => setStartDate(formatDateToUTC(e.target.value))}
//                     />
//                 </td>
//             }
//             {isVisible ?
//                 <td>{formatDateForDisplay(endDate)}</td> 
//             : 

//                 <td>
//                     <input 
//                         type='date' 
//                         value={formatDateForInput(endDate)} 
//                         onChange={(e) => setEndDate(formatDateToUTC(e.target.value))}
//                     />
//                 </td>

//             }
//             <td>
//                 {isVisible ?
//                     <button className='button-23' onClick={handleEditClick}>Edit Booking</button>
//                 : 
//                     <button className='button-23' onClick={handleUpdateClick}>Update Booking</button>
//                 }
//             </td>
//             <td>
//                 <button className='button-23' onClick={handleDeleteClick}>Cancel Booking</button>
//             </td>
//         </tr>
                     
//     )

// }

// export default BookedRentalBooking


    // const startDate = new Date(booking.start_date);
                    // const formattedStartDate = startDate.toLocaleDateString('en-US', {
                    //     year: 'numeric',
                    //     month: 'long',
                    //     day: 'numeric'
                    // });
                    // // const endDate = new Date(booking.end_date);
                    // const formattedEndDate = endDate.toLocaleDateString('en-US', {
                    //     year: 'numeric',
                    //     month: 'long',
                    //     day: 'numeric'
                    // });

                    // function formatDateToInput(date) {
                    //     const year = date.getFullYear();
                    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
                    //     const day = String(date.getDate()).padStart(2, '0');
                    //     return `${year}-${month}-${day}`;
                    //   }

                        // const formattedDate = (dateString) => {
    //     // Create a new Date object from the dateString
    //     const date = new Date(dateString);
                
    //     // Extract the components of the date
    //     const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    //     const day = String(date.getDate()).padStart(2, '0');
    //     const year = date.getFullYear();
                
    //     // Return the formatted date string
    //     return `${month}/${day}/${year}`;
    // };

        // const formatDate = (date) => { 
    //     const [year, month, day] = date.split('-'); 
    //     const d = new Date(Date.UTC(year, month - 1, day)); 
    //     const formattedDate = `${String(d.getUTCMonth() + 1)
    //         .padStart(2, '0')}/${String(d.getUTCDate())
    //             .padStart(2, '0')}/${d.getUTCFullYear()}`; 
    //             return formattedDate; };