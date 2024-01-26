import React, { useState, useEffect } from 'react';
import ResultsPage from '../components/results/resultsPage';

const Results = () => {
  const [searchQuery, setSearchQuery] = useState('');

  // Function to handle the search query input change
  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Function to handle the form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    // Perform the search using the searchQuery
    // Update the searchResults state with the fetched data
  };

  return (
    <div>
      {/* Search form */}
      <form onSubmit={handleFormSubmit}>
        <input type="text" value={searchQuery} onChange={handleSearchQueryChange} />
        <button type="submit">Search</button>
      </form>

      {/* Display search results */}
      <Results searchQuery={searchQuery} />
    </div>
  );
};

export default Results;


// import React from 'react';
// import ResultsPage from '../components/results/resultsPage';

// const Results = ({ results }) => (
//   <div>
//     <h2>Search Results</h2>
    
//     <ul>
//       {results.map((pet) => (
//         <li key={pet.id}>
//           <p>{`Name: ${pet.name}`}</p>
//           <p>{`Type: ${pet.type}`}</p>
//           {/* Add more details as needed */}
//         </li>
//       ))}
//     </ul>
//   </div>
// );

// export default Results;