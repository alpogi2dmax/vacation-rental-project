
import { useEffect, useState } from "react";


function OwnedRentalAmenities({rentalId, rentalAmenities}) {

    const [allAmenities, setAllAmenities] = useState([])
    const [isVisible, setIsVisible] = useState(false)

useEffect(() => {
    console.log('Fetching amenities...');
    fetch('/amenities')
      .then(r => r.json())
      .then(data => {
        console.log('All amenities fetched:', data);
        setAllAmenities(data);
      })
      .catch(error => console.error('Error fetching amenities:', error));
  }, [rentalId, rentalAmenities]);

  function handleToggle() {
    setIsVisible(!isVisible)
  }

 

  return (
    <div>
      {rentalAmenities && rentalAmenities.length > 0 ? (
        <div>
          <ul>
            {rentalAmenities.map((amenity, index) => (
              <li key={amenity.id || index}>{amenity.name}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No specific amenities for this rental.</p>
      )}
      <button onClick={handleToggle}>Add Amenities</button>
      {isVisible && (
        <select>
          {allAmenities.map(amenity => (
            <option key={amenity.id} value={amenity.id}>
              {amenity.name} {/* Ensure you access a property like name */}
            </option>
          ))}
        </select>
      )}
    </div>
  );
}

export default OwnedRentalAmenities