// SearchForm.jsx
import React, { useState } from 'react';
import '../../styles/searchForm.css';

const SearchForm = ({ onSearch }) => {
  const CLIENT = "OrQk1R8l99Br87khJTK3eYpXOyXXU7oe8t7gP4mQLrc688TQUh";
  const SECRET = "E31rZA9nHMB2qgzai5EWSIyU3bsmTZGATh7T0SCs";
  // function to get api token - valid for 1 hour
  // fetch('https://api.petfinder.com/v2/oauth2/token', {
  // method: 'POST',
  // headers: {
  //   'Content-Type': 'application/x-www-form-urlencoded'
  // },
  // body: `grant_type=client_credentials&client_id=${CLIENT}&client_secret=${SECRET}`
  // }).then(data => { return data.json() })
  //   .then( token => { console.log(token) });
  // const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPc…0gpOitXqoSNIbv0HbaVED0QPwXcy2pJAuNlKClivndfwmtqMw";
  const APITOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJPclFrMVI4bDk5QnI4N2toSlRLM2VZcFhPeVhYVTdvZTh0N2dQNG1RTHJjNjg4VFFVaCIsImp0aSI6IjAxNmI5MGQyOTE0MWI4YWQ1M2U5YjIzNThmZmQ1ODlhOTM3MThlYTZhNTBlYTYxNWNmNjVlODBiZDFkNmNjZWQyZWRlNGM2NzRhMzJhZGU1IiwiaWF0IjoxNzA2NTg3MTE2LCJuYmYiOjE3MDY1ODcxMTYsImV4cCI6MTcwNjU5MDcxNiwic3ViIjoiIiwic2NvcGVzIjpbXX0.dIYl_yrNw2RXcGZ2sEOqkksKRgDshTrzRSOxar33k3_KvaRSgoxlMmnUtkfy_AzzSICOwv-bxkGzi6E2H8shEK8deYvDPgGu6QQYsW_sNHZZb2bZmsypnWi3AY0IrACYfMsmH23hT4odjP1BizazC5aURyC6fxONMlIxcLOVf9UGkIs4FYLmqyOyoxo9jBmQDI8rAGAoXD9_sd3Xfua8imRQm1JpvczV6FBYgqCOSED8Kf4wuay1rJHUwngX4LroJW_R2ZJBGNN_JBuSiWOqLySQOOfSWJUrDcTXAE1E_F5dQHp3bFQ-SN9m6FbRQR4yJFiOyYTeBVX3FAg8X2_l2g";
  const [petType, setPetType] = useState('');
  const [petSize, setPetSize] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petAge, setPetAge] = useState('');
  const [petGender, setPetGender] = useState('');
  const [petSpayNeuter, setPetSpayNeuter] = useState('');
  console.log("1: Search Form");
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("2: Call submit function");
    onSearch();
    // Construct API URL with selected options
     const apiUrl = `/get-animals?` + new URLSearchParams({
      type: petType,
   });

     console.log(apiUrl);
     console.log(`Bearer ${APITOKEN}`); 
    try {
      // Make API call
      const response = await fetch(apiUrl, { 
        headers: {
          "Content-Type": "application/json",
          'Authorization': `Bearer ${APITOKEN}`,
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      });
      const data = await response.json();
      console.log(data);
      // Pass the fetched data to the parent component (onSearch callback)
      onSearch(data);
    } catch (error) {
      console.error('Error fetching pet data:', error);
    }

    // Reset the form after submission
    setPetType('');
    setPetSize('');
    setPetBreed('');
    setPetAge('');
    setPetGender('');
    setPetSpayNeuter('');
  };

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
    <form onSubmit={handleFormSubmit} className="search-form">
      <label>
        Pet Type:
        <select className="form-select mb-3" value={petType} onChange={(e) => setPetType(e.target.value)}>
          <option value="">Select a pet type</option>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="rabbit">Rabbit</option>
          <option value="bird">Bird</option>
        </select>
      </label>

      <label>
        Pet Size:
        <select className="form-select mb-3" value={petSize} onChange={(e) => setPetSize(e.target.value)}>
          <option value="">Select a pet size</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </label>

      <label>
        Pet Breed:
        <select className="form-select mb-3" value={petBreed} onChange={(e) => setPetBreed(e.target.value)}>
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
        <select className="form-select mb-3" value={petAge} onChange={(e) => setPetAge(e.target.value)}>
          <option value="">Select a pet age</option>
          <option value="young">Young</option>
          <option value="adult">Adult</option>
          <option value="senior">Senior</option>
        </select>
      </label>

      <label>
        Pet Gender:
        <select className="form-select mb-3" value={petGender} onChange={(e) => setPetGender(e.target.value)}>
          <option value="">Select a pet gender</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>

      <label>
        Spay/Neutered Pet?:
        <select className="form-select mb-4" value={petSpayNeuter} onChange={(e) => setPetSpayNeuter(e.target.value)}>
          <option value="">Select an option</option>
          <option value="yes">Yes</option>
          <option value="no">No</option>
        </select>
      </label>

      <button className="btn btn-primary btn-lg" type="submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;


// import React, { useState } from 'react';

// const SearchForm = ({ onSearch }) => {
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (searchQuery.trim() !== '') {
//       // Perform any additional validation or formatting if needed
//       onSearch(searchQuery);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         value={searchQuery}
//         onChange={(e) => setSearchQuery(e.target.value)}
//         placeholder="Enter your search query"
//       />
//       <button type="submit">Search</button>
//     </form>
//   );
// };

// export default SearchForm;