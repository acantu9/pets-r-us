// Results Page
import React, { useState } from 'react';
import '../styles/Results.css';
import { useStoreContext } from '../utils/GlobalState';

const ResultsPage = ({ searchQuery }) => {
    const [searchResults, setSearchResults] = useState([]);
    const [state, dispatch] = useStoreContext();
    console.log("global state", state);
    const animals = state.pets;

    return (
      <div className='container'>
        <h2>Purrfect Pets!</h2>
        <section >
            <div>
                <div class="row align-items-stretch d-flex flex-wrap justify-content-around">
                  {animals.map((pet) => (
                  <div className="card col-sm-3 justify-content-center card-pet m-3" key={pet.id}>
                    <div className="pet-content p-3">
                      <img className={`card-img-top ${pet.primary_photo_cropped ? '' : 'd-none'}`} src={pet.primary_photo_cropped && pet.primary_photo_cropped.medium} alt="Card image cap"/>
                      <div className="card-body">
                        <h5 className="card-title">{pet.name}</h5>
                        <p className="mb-2">{pet.description}</p>
                      </div>
                      <ul className="pet-list list-group list-group-flush">
                        <li className="list-group-item">Gender: {pet.gender}</li>
                        <li className="list-group-item">Age: {pet.age}</li>
                        <li className="list-group-item mb-2">Adoption Status: {pet.status}</li>
                      </ul>
                      <div className="card-body d-flex flex-column mt-3 contact-card">
                        <a href="#" className="card-link mb-2">Contact Email:</a>
                        <a href="#" className="card-link mb-2">{pet.contact.email}</a>
                        <a href="#" className="card-link mb-2">Contact Phone:</a>
                        <a href="#" className="card-link mb-2">{pet.contact.phone}</a>
                        <a href="#" className="card-link adopt-link">Adopt Me!</a>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
            </div>
        </section>
      </div>
    );
};
  
export default ResultsPage;