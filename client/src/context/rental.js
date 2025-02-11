import React, { useState, useEffect } from 'react';

const RentalContext = React.createContext()


function RentalProvider({children}) {
    const [ rentals, setRentals ] = useState(null)
    

     useEffect(() => {
            fetch('/rentals')
            .then(r => r.json())
            .then(data => setRentals(data))
          }, [])

    return (
        <RentalContext.Provider value={{ rentals, setRentals }}>
            {children}
        </RentalContext.Provider>
    )

}

export { RentalContext, RentalProvider }