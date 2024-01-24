import React, { useState } from 'react';

const SearchForm = () => {
  const [petType, setPetType] = useState('');
  const [petSize, setPetSize] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petSpayNeuter, setPetSpayNeuter] = useState('');

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Perform search based on the selected options
    // You can pass the selected options to a search function or make an API call here
    console.log('Pet Type:', petType);
    console.log('Pet Size:', petSize);
    console.log('Pet Breed:', petBreed);
    console.log('Pet Age:', petAge);
    console.log('Pet Gender:', petGender);
    console.log('Is Pet Spay/Neutered?:', petSpayNeuter);
    // Reset the form after submission
    setPetType('');
    setPetSize('');
    setPetBreed('');
    setPetAge('');
    setPetGender('');
    setPetSpayNeuter('');
  };

  // Define the available pet breeds based on the selected pet type
  let availableBreeds = [];
  if (petType === 'dog') {
    availableBreeds = ['Labrador Retriever', 'Poodle', 'German Shepherd'];
  } else if (petType === 'cat') {
    availableBreeds = ['Domestic Shorthair', 'Maine Coon'];
  } else if (petType === 'rabbit') {
    availableBreeds = ['Rex Rabbit', 'American Fuzzy Lop', 'Havana'];
  } else if (petType === 'bird') {
    availableBreeds = ['Parrot', 'Canary', 'Cockatiels'];
  }

  return (
    <form onSubmit={handleFormSubmit}>
      <label>
        Pet Type:
        <select value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select a pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="bird">Bird</option>
        </select>
      </label>

      <label>
        Pet Size:
        <select value={petSize} onChange={(e) => setPetSize(e.target.value)}>
          <option value="">Select a pet size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        Pet Breed:
        <select value={petBreed} onChange={(e) => setPetBreed(e.target.value)}>
          <option value="">Select a pet breed</option>
          {availableBreeds.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </select>
      </label>

      <label>
        Pet Age:
        <select value={petAge} onChange={(e) => setPetAge(e.target.value)}>
          <option value="">Select a pet age</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </label>

      <label>
        Pet Gender:
        <select value={petGender} onChange={(e) => setPetGender(e.target.value)}>
          <option value="">Select a pet gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Is Pet Spay/Neutered?:
        <select value={petSpayNeuter} onChange={(e) => setPetSpayNeuter(e.target.value)}>
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <button type="submit">Search</button>
    </form>
  );
};

export default SearchForm;