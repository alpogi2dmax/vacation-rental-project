import Login from './Login'

function MyAccount({user, onLogin}) {

    if (!user) return <Login onLogin={onLogin}/>

    console.log(user)

    return (
        <div>
            <h1>Welcome {user.first_name} {user.last_name}!</h1>
        </div>
    )
}

export default MyAccount