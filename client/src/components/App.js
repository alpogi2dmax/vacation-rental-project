import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom"
import NavBar from "./NavBar";
import RentalList from "./RentalList";
import MyAccount from "./MyAccount";


function App() {

  return (
    <div className="fontapp">
      <NavBar />
      <Routes>
        <Route path="rentals" element={<RentalList />}/>
        <Route path="myaccount" element={<MyAccount />}/>
      </Routes>
    </div>
  )
}

export default App;
