import React from "react";
import { Outlet } from "react-router-dom"
import NavBar from "./NavBar";
import { UserProvider } from "../context/user";
import { RentalProvider } from "../context/rental";

function App() {

  return (
    <div className="fontapp">
        <UserProvider>
          <NavBar />
          <>
            <Outlet />
          </>
        </UserProvider>
    </div>
  );
}

export default App;
