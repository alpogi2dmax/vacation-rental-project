import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RentalDetails() {

    const [rental, setRental] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams();

    useEffect(() => {
        fetch(`/rentals/${id}`)
            .then(r => r.json())
            .then(data => {
                setRental(data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Fetch error:', error);
                setLoading(false);
            });
    }, [id]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            {rental ? (
                <p>Rental Details here: {rental.name}</p>
            ) : (
                <p>Rental not found.</p>
            )}
        </div>
    );
}

export default RentalDetails;