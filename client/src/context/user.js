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
              fetch('/amenities')
              .then(r => r.json())
              .then(data => {
                  setAmenities(data);
              })
              .catch(error => console.error('Error fetching amenities:', error));
            }
          })
        .catch(error => console.error('Fetch error:', error));
      }, []);

    const handleLogout = () => {
      fetch(`/logout`, {
        method: "DELETE",
      })
      .then(() => {
        setUser(null)
        setOwnedRentals([])
        setBookedRentals([])
      })
    }

    return (
        <UserContext.Provider value={{user, setUser, ownedRentals, setOwnedRentals, bookedRentals, setBookedRentals, amenities, setAmenities, handleLogout }}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider}

