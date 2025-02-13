
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UserContext } from "../context/user";


function OwnedRentalAmenities({rentalId, rentalAmenities, onRentalAppendAmenity, onRentalRemoveAmenity}) {

    const { amenities, setAmenities } = useContext(UserContext)
    const [allAmenities, setAllAmenities] = useState([])
    const [selectedAmenity, setSelectedAmenity] = useState(1)
    const [isVisible, setIsVisible] = useState(false)
    const [newAmenity, setNewAmenity] = useState('')
    const [showAllAmenities, setShowAllAmenities] = useState(false);


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
    !newAmenity ? alert('Amenity cannot be blank!') :
    fetch('/amenities', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name: newAmenity})
    })
    .then(r => r.json())
    .then(data => {
      setAmenities([...amenities, data])
      const newAmenityId = parseInt(data.id, 10);
      onRentalAppendAmenity(newAmenityId);
      handleToggle();
      setNewAmenity('')
    })
  }

  const toggleAmenities = () => {
    setShowAllAmenities(prevState => !prevState);
};

  return (
    <div>
      {rentalAmenities && rentalAmenities.length > 0 ? (
        <div>
          <ul className={`amenities ${showAllAmenities ? 'expanded' : ''}`}>
            {rentalAmenities.map((amenity, index) => (
              <li key={amenity.id || index}>{amenity.name} <span><button className='button-23' onClick={()=> onRentalRemoveAmenity(amenity.id)}>x</button></span></li>
            ))}
          </ul>
          <span className="toggle-link" onClick={toggleAmenities}>
            {showAllAmenities ? 'See less...' : 'See more...'}
          </span>
        </div>
      ) : (
        <p>No specific amenities for this rental.</p>
      )}
      {!isVisible && <button className='button-23' onClick={handleToggle}>Add Amenities</button>}
      <br></br>
      {isVisible && (
        <div>
          <select value={selectedAmenity} onChange={(e) => setSelectedAmenity(e.target.value)}>
            {amenities.map((amenity) => (
              <option key={amenity.id} value={amenity.id}>
                {amenity.name}
              </option>
            ))}
          </select>
          <button className='button-23' onClick={handleClick}>Add Amenity</button>
          <br></br>
          <input type='text' id='newamenities' name='newamenities' value={newAmenity} onChange={e => setNewAmenity(e.target.value)}></input>
          <button className='button-23' onClick={handleAddAmenityClick}>Add Amenity to List</button>
        </div>
      )}
    </div>
  );

}

OwnedRentalAmenities.defaultProps = {
  rentalAmenities: [],
};

export default OwnedRentalAmenities