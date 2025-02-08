

function OwnedPropertyBookings({bookings}) {

    if (bookings.length === 0) return (<p>There are no bookings at this time.</p>)

    return (
        
        <table style={{ width: "100%" }}>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                </tr>
            </thead>
            <tbody>
                {bookings.map(booking => {
                    const startDate = new Date(booking.start_date);
                    const formattedStartDate = startDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    const endDate = new Date(booking.end_date);
                    const formattedEndDate = endDate.toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                    });
                    return (
                        <tr key={booking.id}>
                            <td>{booking.traveler.first_name} {booking.traveler.last_name}</td>
                            <td>{formattedStartDate}</td>
                            <td>{formattedEndDate}</td>
                        </tr>
                        );
                    })}
            </tbody>
        </table>
    )

}

export default OwnedPropertyBookings