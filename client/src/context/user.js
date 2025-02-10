import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()

function UserProvider({children}) {
    const [ user, setUser ] = useState(null)
    const [ ownedRentals, setOwnedRentals] = useState([])

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
            }
          })
          .catch(error => console.error('Fetch error:', error));
      }, []);

    return (
        <UserContext.Provider value={{user, setUser, ownedRentals, setOwnedRentals}}>
            {children}
        </UserContext.Provider>
    )

}

export { UserContext, UserProvider}

