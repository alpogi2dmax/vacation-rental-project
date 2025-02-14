import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { UserContext } from '../context/user';

function RentalReviewForm({rental, onAddReview}) {

    const { user } = useContext(UserContext)

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter title").min(3, 'Must be more than 3 characters').max(50, 'Must be less than 50 characters.'),
        review: yup.string().required("Must enter review").min(3, 'Must be more than 3 characters').max(1000, 'Must be less than 1000 characters.'),
    })

    const formik = useFormik({
        initialValues: {
            title: "",
            review: "",
            reviewer_id: user.id,
            reviewed_rental_id: rental.id
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("/reviews", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values, null, 2),
            })
            .then((r) => r.json())
            .then((review) => {
                onAddReview(review)
            })
        },
    })



    return (
        <form className='reviewform' onSubmit={formik.handleSubmit}>
            <label>Title: </label>
            <input type='text' name='title' id='title' value={formik.values.title} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.title}</p>
            <label>Review: </label>
            <textarea name='review' id='review' value={formik.values.review} onChange={formik.handleChange} rows="5" cols="50"/>
            <p style={{color: "red" }}> {formik.errors.review}</p>
            <button className='button-23' type='submit'>Submit Review</button>
        </form>
    )
}

export default RentalReviewForm;