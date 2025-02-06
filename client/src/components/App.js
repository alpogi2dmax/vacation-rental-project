import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"
import NavBar from "./NavBar";
import RentalList from "./RentalList";
import MyAccount from "./MyAccount";


function App() {

  const [user, setUser] = useState(null)

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
        }
      })
      .catch(error => console.error('Fetch error:', error));
  }, []);

  function handleLogOut() {
    fetch('/logout', { method: 'DELETE' }).then((r) => {
        if (r.ok) {
            setUser(null);
        }
    })
}

  return (
    <div className="fontapp">
      <NavBar onLogOut={handleLogOut}/>
      <Routes>
        <Route path="" element={<RentalList />}/>
        <Route path="myaccount" element={<MyAccount user={user} onLogin={setUser}/>}/>
      </Routes>
    </div>
  )
}

export default App;
