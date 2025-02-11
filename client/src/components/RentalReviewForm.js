import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { UserContext } from '../context/user';

function RentalReviewForm({rental, onAddReview}) {

    const { user } = useContext(UserContext)

    const formSchema = yup.object().shape({
        title: yup.string().required("Must enter title"),
        review: yup.string().required("Must enter review"),
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
        <form onSubmit={formik.handleSubmit}>
            <label>Title: </label>
            <input type='text' name='title' id='title' value={formik.values.title} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.title}</p>
            <label>Review: </label>
            <textarea name='review' id='review' value={formik.values.review} onChange={formik.handleChange} rows="5" cols="50"/>
            <p style={{color: "red" }}> {formik.errors.review}</p>
            <button type='submit'>Submit Review</button>
        </form>
    )
}

export default RentalReviewForm;