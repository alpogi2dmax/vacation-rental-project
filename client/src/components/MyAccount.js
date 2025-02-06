import Login from './Login'
import React, { useEffect, useState } from "react";


function MyAccount({user, onLogin, ownedRentals}) {

    if (!user) return <Login onLogin={onLogin}/>

    console.log(ownedRentals)

    return (
        <div>
            <h2>My Properties</h2>
        </div>
    )
}

export default MyAccount