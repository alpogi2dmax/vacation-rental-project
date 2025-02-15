import { useContext } from 'react'
import { UserContext } from '../context/user'
import { useFormik } from 'formik';
import * as yup from "yup";

function EditUserProfile({onHandleToggle}) {

    const {user, setUser} = useContext(UserContext)

    const formSchema = yup.object().shape({
            username: yup.string().required("Must enter username").min(2, 'Must be more than 1 character').max(15, 'Must be less than 15 characters.'),
            email: yup.string().required("Must enter email address"),
            first_name: yup.string().required("Must enter first name"),
            last_name: yup.string().required("Must enter last name"),
            profile_pic: yup.string().required("Must enter profile picture")
        })

    const formik = useFormik({
            initialValues: {
                username: user.username || "",
                email: user.email || "",
                first_name: user.first_name || "",
                last_name: user.last_name || "",
                profile_pic: user.profile_pic || "",
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
                fetch(`users/${user.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(values, null, 2),
                })
                .then((r) => r.json())
                .then((user) => {
                    setUser(user)
                    onHandleToggle()
                })
            },
        })

    return(
        <div className='addpropertyform'>
            <form onSubmit={formik.handleSubmit}>
                    <label>Username: </label>
                    <input type='text' name='username' id='username' value={formik.values.username} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.username}</p>
                    <label>Password: </label>
                    <label>Email: </label>
                    <input type='text' name='email' id='email' value={formik.values.email} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.email}</p>
                    <label>First Name: </label>
                    <input type='text' name='first_name' id='first_name' value={formik.values.first_name} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.first_name}</p>
                    <label>Last Name: </label>
                    <input type='text' name='last_name' id='last_name' value={formik.values.last_name} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.last_name}</p>
                    <label>Profile Picture: </label>
                    <input type='text' name='profile_pic' id='profile_pic' value={formik.values.profile_pic} onChange={formik.handleChange} />
                    <p style={{color: "red" }}> {formik.errors.profile_pic}</p>
                    <button className='button-23' type='submit'>Update Profile</button>
                </form>
                <button className='button-23' onClick={onHandleToggle}>Cancel</button>
        </div>
    )
}

export default EditUserProfile