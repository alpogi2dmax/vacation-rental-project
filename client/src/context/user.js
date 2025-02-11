import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()


function UserProvider({children}) {
    const [ user, setUser ] = useState(null)
    const [ ownedRentals, setOwnedRentals] = useState([])
    const [ bookedRentals, setBookedRentals ] = useState([])
    const [ amenities, setAmenities ] = useState([])

    useEffect(() => {
        fetch('/checksession')
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            if (data.session === null) {
              console.log('No active session');
            } else {
              setUser(data);
              setOwnedRentals(data.owned_rentals)
              setBookedRentals(data.rentals)
              console.log('Fetching amenities...');
              fetch('/amenities')
              .then(r => r.json())
              .then(data => {
                  console.log('All amenities fetched:', data);
                  setAmenities(data);
              })
              .catch(error => console.error('Error fetching amenities:', error));
            }
          })
        .catch(error => console.error('Fetch error:', error));
      }, []);

    // function handleDeleteBookingClick(booking) {
    //   console.log(booking);
    //     fetch(`/bookings/${booking.id}`, {
    //         method: "DELETE",
    //     })
    //     .then(() => {
    //         //my bookedRentals has bookedRentals and each has bookings.
    //         //find bookedRental and remove booking from bookedRental.bookings
    //         //if bookedRental.bookings.length === 0, remove from bookedRentals
    //         //otherwise, update bookedRental.bookings to all except the booking...
    //         const selectedBookedRental = bookedRentals.find(br => br.id === booking.rental_id)
    //         const updatedBookedRentalBookings = selectedBookedRental.bookings.filter(b => b.id !== booking.id)
    //         const updatedSelectedBookedRental = {...selectedBookedRental, bookings: updatedBookedRentalBookings}
    //         const updatedBookedRentals = []
    //         bookedRentals.forEach(br => {
    //             if (br.id !== booking.rental_id) {
    //                 updatedBookedRentals.push(br)
    //             } else {
    //                 if (updatedBookedRentalBookings.length !== 0) {
    //                     updatedBookedRentals.push(updatedSelectedBookedRental)
    //                 }
    //             }
    //             setBookedRentals(updatedBookedRentals)
    //         })
    //         // setRental(prevRental => {
    //         //     const updatedRental = {
    //         //         ...prevRental,
    //         //         bookings: prevRental.bookings.filter(booking => booking.id !== bookingId)
    //         //     };
    //         //     // Update the global state
    //         //     handleUpdateBookedRentals(updatedRental);
    //         //     return updatedRental; // Return the updated rental for local state
    //         // });
    //     });

    // }

    const filteredBookedRentals = bookedRentals.filter(rental => rental.bookings && rental.bookings.length > 0);

    return (
        <UserContext.Provider value={{user, setUser, ownedRentals, setOwnedRentals, bookedRentals, filteredBookedRentals, setBookedRentals, amenities, setAmenities }}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider}

