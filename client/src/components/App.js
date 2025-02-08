import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"
import NavBar from "./NavBar";
import RentalList from "./RentalList";
import MyAccount from "./MyAccount";
import OwnedRentalDetails from "./OwnedRentalDetails";


function App() {

  const [user, setUser] = useState(null)
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
          setOwnedRentals(data.owned_rentals);
          setBookedRentals(data.rentals);
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
        if (r.ok) {
            setUser(null);
            setOwnedRentals([]);
            setBookedRentals([]);
        }
    })
}

  return (
    <div className="fontapp">
         <NavBar onLogOut={handleLogOut}/>
           <>
             {user ? <p>Welcome {user.first_name} {user.last_name}</p> : <p>Welcome Guest!</p>}
             <Routes>
               <Route path="" element={<RentalList />}/>
               <Route path="myaccount" element={<MyAccount user={user} onLogin={setUser} ownedRentals={ownedRentals} bookedRentals={bookedRentals}/>}/>
               <Route path="/ownedrentaldetails/:id" element={<OwnedRentalDetails />}/>
             </Routes>
           </>
       </div>
  )
}

export default App;
