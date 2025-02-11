
import { useEffect, useState } from "react";


function OwnedRentalAmenities({rentalId, rentalAmenities, onRentalAppendAmenity, onRentalRemoveAmenity}) {

    const [allAmenities, setAllAmenities] = useState([])
    const [selectedAmenity, setSelectedAmenity] = useState("")
    const [isVisible, setIsVisible] = useState(false)
    const [newAmenity, setNewAmenity] = useState('')

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
    const selectedAmenityId = parseInt(selectedAmenity, 10);
    if (rentalAmenities.map(amenity => amenity.id).includes(selectedAmenityId)) {
      alert('Amenity is already on the list. Select another one.');
    } else {
      onRentalAppendAmenity(selectedAmenityId);
      handleToggle();
    }
  }

  function handleAddAmenityClick() {
    fetch('/amenities', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: newAmenity})
    })
    .then(r => r.json())
    .then(data => {
      setAllAmenities([...allAmenities, data])
      const newAmenityId = parseInt(data.id, 10);
      onRentalAppendAmenity(newAmenityId);
      handleToggle();
      setNewAmenity('')
    })
  }

  return (
    <div>
      {rentalAmenities && rentalAmenities.length > 0 ? (
        <div>
          <ul>
            {rentalAmenities.map((amenity, index) => (
              <li key={amenity.id || index}>{amenity.name} <button onClick={()=> onRentalRemoveAmenity(amenity.id)}>Remove</button></li>
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
          <br></br>
          <input type='text' id='newamenities' name='newamenities' value={newAmenity} onChange={e => setNewAmenity(e.target.value)}></input>
          <button onClick={handleAddAmenityClick}>Add Amenity to List</button>
        </div>
      )}
    </div>
  );

}

OwnedRentalAmenities.defaultProps = {
  rentalAmenities: [],
};

export default OwnedRentalAmenities