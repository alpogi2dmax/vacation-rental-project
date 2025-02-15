import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { UserContext } from '../context/user';
import { Navigate, useNavigate } from 'react-router-dom';

function BookingRentalForm({rental}) {

    const { user, bookedRentals, setBookedRentals } = useContext(UserContext)
    const navigate = useNavigate()

    const formatDateForBackend = (date) => { 
        const [year, month, day] = date.split('-'); 
        const d = new Date(Date.UTC(year, month - 1, day)); 
        const formattedDate = `${String(d.getUTCMonth() + 1)
            .padStart(2, '0')}/${String(d.getUTCDate())
                .padStart(2, '0')}/${d.getUTCFullYear()}`; 
                return formattedDate; };

    const formSchema = yup.object().shape({
        start_date: yup.string().required("Start date is required"),
        end_date: yup.string()
            .required("End date is required")
            .test('is-greater', 'End date must be later than start date', function(value) {
                const { start_date } = this.parent;
                return new Date(value) > new Date(start_date);
            }),
    });

    const formik = useFormik({
        initialValues: {
            start_date: "",
            end_date: "",
            traveler_id: user.id,
            rental_id: rental.id,
            name: ""
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            // Convert the start_date and end_date to the desired format
            const formattedStartDate = formatDateForBackend(values.start_date)
            const formattedEndDate = formatDateForBackend(values.end_date)
     
            const formattedValues = {
                ...values,
                start_date: formattedStartDate,
                end_date: formattedEndDate,
                name: user.first_name
            };

            fetch("/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formattedValues, null, 2),
            })
            .then((r) => r.json())
            .then((booking) => {
                const newBookingArray = []
                newBookingArray.push(booking)
                const newRental = {...rental, bookings: newBookingArray}

                const rentalExists = bookedRentals.some(br => br.id === newRental.id);

                if (!rentalExists) {
                    // If it doesn't exist, add the newRental
                    setBookedRentals([...bookedRentals, newRental]);
                } else {
                    // If it exists, update the existing rental
                    const selectedBookRental = bookedRentals.find(br => br.id == newRental.id)
                    const newBookings = [...selectedBookRental.bookings, booking]
                    const newSelectedBookRental = {...selectedBookRental, bookings: newBookings}
                    setBookedRentals(bookedRentals.map(br => br.id === newSelectedBookRental.id ? newSelectedBookRental : br))
                }   
            })
            .then(() => {
                navigate('/myaccount')
            })
            .catch((error) => {
                console.log("Error:", error);
            })
        },
    })

    return (
        <form className='bookingform' onSubmit={formik.handleSubmit}>
            <input type="hidden" name="name" value={formik.values.name} />
            <label>Start Date: </label>
            <input type='date' name='start_date' id='start_date' value={formik.values.start_date} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.start_date}</p>
            <label>End Date: </label>
            <input type='date' name='end_date' id='end_date' value={formik.values.end_date} onChange={formik.handleChange} />
            <p style={{color: "red" }}> {formik.errors.end_date}</p>
            <button className='button-23' type='submit'>Book Rental</button>
        </form>
    )
}

export default BookingRentalForm;