// // Search.jsx
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import SearchForm from './SearchForm';

const Search = () => {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();

  const handleSearch = async (searchQuery) => {
    try {
      console.log("3: Start searching for pets!");

      // Make an API call to fetch the search results
      const response = await fetch(`API_ENDPOINT/search?query=${searchQuery}`);
      const data = await response.json();

      console.log('SEARCH RESULTS', data);

      // Update the searchResults state with the fetched data
      setSearchResults(data);

      history.push('/Results'); // Navigate to the Results page
    } catch (error) {
      console.error('Error searching for pets:', error);
    }
  };

  useEffect(() => {
    // Perform any additional logic or API calls here if needed
  }, [searchResults]);

  return (
    <div>
      <h1 className="h1 mb-10">Let's Find Your Purrfect Pet!</h1>
      <SearchForm onSearch={handleSearch} />
    </div>
  );
};

export default Search;

// import React, { useState } from 'react';
// import SearchForm from '../components/search/SearchForm';

// const Search = () => {
//   const [searchResults, setSearchResults] = useState([]);

//   // Callback function to handle search results
  // const handleSearch = (results) => {
  //   setSearchResults(results);
  // };

//   return (
//     <div>
//       <h1 className="h1 mb-10">Let's Find Your Purrfect Pet!</h1>
//       <SearchForm onSearch={handleSearch} />

//       {/* Display the list of search results */}
//       <div>
//         <h2>Search Results</h2>
//         <ul>
//           {searchResults.map((pet) => (
//             <li key={pet.id}>
//               <p>{`Name: ${pet.name}`}</p>
//               <p>{`Type: ${pet.type}`}</p>
//               {/* Add more details as needed */}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default Search;
