import React, { useState } from 'react';

const PetCard = ({ pet }) => {
  // State to manage the list of favorite pets
  const [favorites, setFavorites] = useState([]);

  // Function to handle saving a pet to favorites
  const saveToFavorites = () => {
    setFavorites([...favorites, pet]);
    // You may want to store the favorites in a database or context for persistence.
  };

  return (
    <div>
      {/* Display pet details */}
      <h2>{pet.name}</h2>
      <p>{pet.description}</p>
      
      {/* Save button */}
      <button onClick={saveToFavorites}>Save to Favorites</button>
    </div>
  );
};

export default PetCard;
