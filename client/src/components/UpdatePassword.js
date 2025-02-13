import { useContext } from 'react'
import { UserContext } from '../context/user'
import { useFormik } from 'formik';
import * as yup from "yup";

function UpdatePassword({onHandlePwToggle}) {

    const { user, setUser } = useContext(UserContext)

        const formSchema = yup.object().shape({
            password: yup.string()
                .min(8, 'Password must be at least 8 characters')
                .matches(
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
                    'Password must contain at least one uppercase, one lowercase, one number and one special character'
                )
                .required('Password is required'),
            confirm_password: yup.string()
                .oneOf([yup.ref('password'), null], 'Passwords must match')
                .required('You must confirm your password')
        });
    
        const formik = useFormik({
            initialValues: {
                password: "",
                confirm_password: ""
            },
            validationSchema: formSchema,
            onSubmit: (values) => {
                console.log("Submitting:", values); // Debugging line
                fetch(`/users/${user.id}`, {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ password: values.password }), // Ensure the structure matches backend expectations
                })
                .then((r) => {
                    if (!r.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return r.json();
                })
                .then((updatedUser) => {
                    console.log("Response user:", updatedUser); // Debugging line
                    setUser(updatedUser);
                    onHandlePwToggle()
                })
                .catch((error) => {
                    console.error("Error updating password:", error); // Error handling
                });
            },
        });

    return(
        <div className='addpropertyform'>
            <form onSubmit={formik.handleSubmit}>
                <label>Password: </label>
                <input type='password' name='password' id='password' value={formik.values.password} onChange={formik.handleChange} />
                <p style={{color: "red" }}> {formik.errors.password}</p>
                <label>Confirm Password:</label>
                <input type='password' name='confirm_password' id='confirm_password' value={formik.values.confirm_password} onChange={formik.handleChange} />
                <p style={{color: "red"}}>{formik.errors.confirm_password}</p>
                <button className='button-23' type='submit'>Update Password</button>
            </form>
            <button className='button-23' onClick={onHandlePwToggle}>Cancel</button>
        </div>
    )
}

export default UpdatePassword