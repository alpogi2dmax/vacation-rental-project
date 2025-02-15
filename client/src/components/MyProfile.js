import { useContext, useState } from 'react'
import { UserContext } from '../context/user'
import EditUserProfile from './EditUserProfile';
import UpdatePassword from './UpdatePassword';
import Login from './Login';

function MyProfile() {

    const {user} = useContext(UserContext)
    const [isVisible, setIsVisible] = useState(true)
    const [isPwVisible, setIsPwVisible] = useState(true)

    if (!user) {
        return <Login />;
    }

    const handleToggle = () => {
        setIsVisible(!isVisible)
    }

    const handlePwToggle = () => {
        setIsPwVisible(!isPwVisible)
    }

        return(
            <div>
                <h2>User Profile</h2>
                {isVisible && 
                    <div className='userprofile clearfix'>
                        <img className='userimage' src={user.profile_pic} alt={user.profile_pic} />
                        <div className='userdetails'>
                            <p>Name: {user.first_name} {user.last_name}</p>
                            <p>Email: {user.email}</p>
                        </div>
                    </div>
                }
                {isVisible && <button onClick={handleToggle} className='button-23'>Update Profile</button>}
                {!isVisible && <EditUserProfile onHandleToggle={handleToggle}/>}
                <h2>Update Password</h2>
                {isPwVisible && <button className='button-23' onClick={handlePwToggle}>Update Password</button>}
                {!isPwVisible && <UpdatePassword onHandlePwToggle={handlePwToggle}/>}
            </div>
        )
}

export default MyProfile