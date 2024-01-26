// Results Page
import React, { useState } from 'react';
import '../../styles/Results.css';

const ResultsPage = ({ searchQuery }) => {
    const [searchResults, setSearchResults] = useState([]);
  
    useEffect(() => {
      // Fetch the search results based on the searchQuery
      // Update the searchResults state with the fetched data
      // Example:
      const fetchSearchResults = async () => {
        const response = await fetch(`API_URL?q=${searchQuery}`);
        const data = await response.json();
        setSearchResults(data.results);
      };
  
      fetchSearchResults();
    }, [searchQuery]);
  
    return (
      <div>
        <h2>Search Results</h2>
        <ul>
          {searchResults.map((pet) => (
            <li key={pet.id}>
              <p>{`Name: ${pet.name}`}</p>
              <p>{`Type: ${pet.type}`}</p>
              {/* Add more details as needed */}
            </li>
          ))}
        </ul>
      </div>
    );
};
  
export default ResultsPage;

// import React from 'react';
// import '../../styles/Results.css';

// const ResultsPage = () => {
//   // Fetch search results from API or get them from state
//   const searchResults = [
//     { id: 1, name: 'Pet 1', type: 'Dog' },
//     { id: 2, name: 'Pet 2', type: 'Cat' },
//     // Add more search results as needed
//   ];

//   return (
//     <div>
//       {/* Other components and search form */}
//       <Results results={searchResults} />
//     </div>
//   );
// };

// export default ResultsPage;