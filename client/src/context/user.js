import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()

function UserProvider({children}) {
    const [ user, setUser ] = useState(null)
    const [ ownedRentals, setOwnedRentals] = useState([])
    const [ bookedRentals, setBookedRentals ] = useState([])

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
            }
          })
          .catch(error => console.error('Fetch error:', error));
      }, []);

    //   function handleDeleteBooking() {
    //     // window.location.reload()
    //     }


    return (
        <UserContext.Provider value={{user, setUser, ownedRentals, setOwnedRentals, bookedRentals, setBookedRentals }}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider}

