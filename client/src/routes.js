import { Routes, Route, Link } from "react-router-dom"
import RentalList from "./components/RentalList"
import MyAccount from "./components/MyAccount"
import OwnedRentalDetails from "./components/OwnedRentalDetails"
import RentalDetails from "./components/RentalDetails"
import App from "./components/App"


const routes = [ 
    {
        path: "/",
        element: <App />,
        children: [
            { 
                path: "/", 
                element: <RentalList />, 
            }, 
            { 
                path: "/myaccount", 
                element: <MyAccount />, 
            }, 
            { 
                path: "/ownedrentaldetails/:id", 
                element: <OwnedRentalDetails />, 
            }, 
            { 
                path: "/rentaldetails/:id", 
                element: <RentalDetails />, 
            }, 
        ]
    }
];

export default routes