import { useFormik } from 'formik';
import * as yup from "yup";
import { useContext } from 'react';
import { UserContext } from '../context/user';

function EditOwnedRentalDetails({rental, onToggle, onRental}) {

    const { user, ownedRentals, setOwnedRentals } = useContext(UserContext)

    const formSchema = yup.object().shape({
                name: yup.string().required("Must enter name").min(3, 'Must be more than 3 character').max(50, 'Must be less than 30 characters.'),
                address: yup.string().required("Must enter address").min(3, 'Must be more than 3 character').max(30, 'Must be less than 30 characters.'),
                city: yup.string().required("Must enter first name").min(3, 'Must be more than 3 character').max(20, 'Must be less than 30 characters.'),
                state: yup.string().required("Must enter state"),
                daily_rate: yup.number().required("Must enter a daily rate").min(3, 'Must be longer than 3 characters'),
                cover_pic: yup.string().required(),
                description: yup.string().required("Must enter description").min(3, 'Must be longer than 3 characters')
                })
            
                const formik = useFormik({
                    enableReinitialize: true,
                    initialValues: {
                        name: rental?.name || '',
                        address: rental?.address || '',
                        city: rental?.city || '',
                        state: rental?.state || '',
                        daily_rate: rental?.daily_rate || '',
                        description: rental?.description || '',
                        cover_pic: rental?.cover_pic || '',
                        owner_id: user?.id || ''
                    },
                    validationSchema: formSchema,
                    onSubmit: (values) => {
                        fetch(`/rentals/${rental.id}`, {
                            method: "PATCH",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON.stringify(values, null, 2),
                        })
                        .then((r) => r.json())
                        .then((rental) => {
                            onRental(rental)
                            onToggle()
                            setOwnedRentals(ownedRentals.map(ownedRental => {
                                if (ownedRental.id === rental.id) {
                                    return rental
                                }
                                return ownedRental
                            }))
                        })
                    },
                })

    return (
        <div>
            
                <div className='addpropertyform'>
                    <h2>Edit Property Details</h2>
                        <form onSubmit={formik.handleSubmit}>
                            <label>Name: </label>
                            <input type='text' name='name' id='name' value={formik.values.name} onChange={formik.handleChange} />
                            <p style={{color: "red" }}> {formik.errors.name}</p>
                            <label>Address: </label>
                            <input type='text' name='address' id='address' value={formik.values.address} onChange={formik.handleChange} />
                            <p style={{color: "red" }}> {formik.errors.address}</p>
                            <label>City: </label>
                            <input type='text' name='city' id='city' value={formik.values.city} onChange={formik.handleChange} />
                            <p style={{color: "red" }}> {formik.errors.city}</p>
                            <label>State: </label>
                            <input type='text' name='state' id='state' value={formik.values.state} onChange={formik.handleChange} />
                            <p style={{color: "red" }}> {formik.errors.state}</p>
                            <label>Daily Rate: </label>
                            <input type='number' name='daily_rate' id='daily_rate' value={formik.values.daily_rate} onChange={formik.handleChange} />
                            <p style={{color: "red" }}> {formik.errors.daily_rate}</p>
                            <label>Description: </label>
                            <textarea name='description' id='description' value={formik.values.description} onChange={formik.handleChange} rows="4" style={{ width: '75%' }}/>
                            <p style={{color: "red" }}> {formik.errors.description}</p>
                            <label>Cover Photo: </label>
                            <input type='text' name='cover_pic' id='cover_pic' value={formik.values.cover_pic} onChange={formik.handleChange} />
                            <p style={{color: "red" }}> {formik.errors.cover_pic}</p>
                            <button className='button-23' type='submit'>Submit Changes</button>
                        </form>
                </div>
            
        </div>
    )
}

export default EditOwnedRentalDetails