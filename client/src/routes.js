import { Routes, Route, Link } from "react-router-dom"
import RentalList from "./components/RentalList"
import MyAccount from "./components/MyAccount"
import OwnedRentalDetails from "./components/OwnedRentalDetails"
import RentalDetails from "./components/RentalDetails"
import BookedRental from "./components/BookedRental"
import App from "./components/App"
import MyProfile from "./components/MyProfile"


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
                path: "/myprofile",
                element: <MyProfile />
            },
            { 
                path: "/ownedrentaldetails/:id", 
                element: <OwnedRentalDetails />, 
            }, 
            { 
                path: "/rentaldetails/:id", 
                element: <RentalDetails />, 
            }, 
            { 
                path: "/bookedrental/:id", 
                element: <BookedRental />, 
            }, 
        ]
    }
];

export default routes