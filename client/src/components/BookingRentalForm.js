import React, { useContext } from 'react';
import { useFormik } from 'formik';
import * as yup from "yup";
import { UserContext } from '../context/user';
import { Navigate, useNavigate } from 'react-router-dom';

function BookingRentalForm({rental}) {

    const { user, bookedRentals, setBookedRentals } = useContext(UserContext)
    const navigate = useNavigate()

    const formatDateForBackend = (date) => {
        const d = new Date(date);
        const month = (d.getMonth() + 1).toString().padStart(2, '0');
        const day = d.getDate().toString().padStart(2, '0');
        const year = d.getFullYear();
        return `${month}/${day}/${year}`;
    };

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

            console.log(formattedValues)
            fetch("/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formattedValues, null, 2),
            })
            .then((r) => r.json())
            .then((booking) => {
                console.log(bookedRentals)
                console.log(rental)
                console.log(booking)
                const selectedBookedRental = bookedRentals.find(br => br.id == rental.id)
                console.log(selectedBookedRental)
                const newRentalBookings = [...rental.bookings, booking]
                const filteredRentalBookings = newRentalBookings.filter(b => b.traveler_id === user.id)
                console.log(newRentalBookings)
                const newRental = {...rental, bookings: filteredRentalBookings}
                console.log(newRental)
                const rentalExists = bookedRentals.some(br => br.id === newRental.id);

                if (!rentalExists) {
                    // If it doesn't exist, add the newRental
                    setBookedRentals([...bookedRentals, newRental]);
                } else {
                    // If it exists, update the existing rental
                    setBookedRentals(bookedRentals.map(br => br.id === newRental.id ? newRental : br));
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
            <button type='submit'>Book Rental</button>
        </form>
    )
}

export default BookingRentalForm;