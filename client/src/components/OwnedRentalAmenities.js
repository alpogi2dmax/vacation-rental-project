
import { useEffect, useState } from "react";


function OwnedRentalAmenities({rentalId, rentalAmenities, onRentalAppendAmenity}) {

    const [allAmenities, setAllAmenities] = useState([])
    const [selectedAmenity, setSelectedAmenity] = useState("")
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

  function handleClick() {
    const selectedAmenityId = parseInt(selectedAmenity, 10); // Convert to a number if IDs are numbers
    if (rentalAmenities.map(amenity => amenity.id).includes(selectedAmenityId)) {
      alert('Amenity is already on the list. Select another one.');
    } else {
      onRentalAppendAmenity(selectedAmenityId);
      handleToggle();
    }
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
      {!isVisible && <button onClick={handleToggle}>Add Amenities</button>}
      <br></br>
      {isVisible && (
        <div>
          <select value={selectedAmenity} onChange={(e) => setSelectedAmenity(e.target.value)}>
            {allAmenities.map((amenity) => (
              <option key={amenity.id} value={amenity.id}>
                {amenity.name}
              </option>
            ))}
          </select>
          <button onClick={handleClick}>Add Amenity</button>
        </div>
      )}
    </div>
  );

}

export default OwnedRentalAmenities