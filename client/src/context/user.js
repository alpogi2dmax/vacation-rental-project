import React, { useState, useEffect } from 'react';

const UserContext = React.createContext()

function UserProvider({children}) {
    const [ user, setUser ] = useState(null)
    const [ownedRentals, setOwnedRentals] = useState([])
    const [bookedRentals, setBookedRentals] = useState([])

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
              console.log(data.owned_rentals)
              setOwnedRentals(data.owned_rentals || []); // Ensure arrays are initialized
              setBookedRentals(data.rentals || []);
            }
            // setLoading(false); // Set loading to false after data is fetched
          })
          .catch(error => console.error('Fetch error:', error));
        //   setLoading(false); // Ensure loading state is updated even on error
      }, []);

    return (
        <UserContext.Provider value={{user, setUser}}>
            {children}
        </UserContext.Provider>
    )

    // function handleLogOut() {
    //     fetch('/logout', { method: 'DELETE' }).then((r) => {
    //       if (r.ok) {
    //           console.log('Logged out'); // Debug log
    //           setUser(null);
    //           setOwnedRentals([]);
    //           setBookedRentals([]);
    //       }
    //     })
    //   }

}

export { UserContext, UserProvider}

