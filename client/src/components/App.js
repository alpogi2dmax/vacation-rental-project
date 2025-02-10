import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"
import NavBar from "./NavBar";
import RentalList from "./RentalList";
import MyAccount from "./MyAccount";
import OwnedRentalDetails from "./OwnedRentalDetails";
import RentalDetails from "./RentalDetails";


function App() {

  const [user, setUser] = useState(null)
  const [ownedRentals, setOwnedRentals] = useState([])
  const [bookedRentals, setBookedRentals] = useState([])
  const [loading, setLoading] = useState(true); // Add a loading state


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
          setOwnedRentals(data.owned_rentals || []); // Ensure arrays are initialized
          setBookedRentals(data.rentals || []);
        }
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch(error => console.error('Fetch error:', error));
      setLoading(false); // Ensure loading state is updated even on error
  }, []);

  if (loading) {
    return <p>Loading...</p>;
}

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
      if (r.ok) {
          console.log('Logged out'); // Debug log
          setUser(null);
          setOwnedRentals([]);
          setBookedRentals([]);
      }
    })
  }

  return (
    <div className="fontapp">
      <NavBar user={user} onLogOut={handleLogOut} />
      <>
        {loading ? (
          <p>Loading...</p> // Show loading message while data is being fetched
        ) : (
          <>
            {user ? <p>Welcome {user.first_name} {user.last_name}</p> : <p>Welcome Guest!</p>}
            <Routes>
              <Route path="/" element={<RentalList />} />
              <Route path="/myaccount" element={<MyAccount user={user} onLogin={setUser} ownedRentals={ownedRentals} bookedRentals={bookedRentals} />} />
              <Route path="/ownedrentaldetails/:id" element={<OwnedRentalDetails />} />
              <Route path="/rentaldetails/:id" element={<RentalDetails />} />
            </Routes>
          </>
        )}
      </>
    </div>
  );


// return (
//   <div className="fontapp">
//        <NavBar user={user} onLogOut={handleLogOut}/>
//          <>
//            {user ? <p>Welcome {user.first_name} {user.last_name}</p> : <p>Welcome Guest!</p>}
//            <Routes>
//              <Route path="" element={<RentalList />}/>
//              <Route path="myaccount" element={<MyAccount user={user} onLogin={setUser} ownedRentals={ownedRentals} bookedRentals={bookedRentals}/>}/>
//              <Route path="/ownedrentaldetails/:id" element={<OwnedRentalDetails />}/>
//            </Routes>
//          </>
//      </div>
// )
}

export default App;
