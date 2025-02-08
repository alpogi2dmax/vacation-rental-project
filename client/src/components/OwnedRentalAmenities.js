



function OwnedRentalAmenities({amenities}) {

    if (amenities.length === 0) return (<p>There are no reviews at this time.</p>)

    console.log(amenities)

    return (
        
        <div>
            <ul>
                {amenities.map(amenity => (
                    <li>{amenity.name}</li>
                ))}
            </ul>
        </div>
    )

}

export default OwnedRentalAmenities