import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';

import Auth from '../utils/auth';

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";


const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  rootElement
);

function App() {
    const user = 'Profile' //Replace with Users profile info
    const favorites = 'favorites-btn' 
    //const donate = 'donate-btn'
    //const quiz = 'take-quiz'
}

return(
<main>
{/* User Profile Card */}
<div class="card mb-3" style="max-width: 540px;">
  <div class="row g-0">
    <div class="col-md-4">
        
{/* User Icon */}
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title">User Placeholder</h5>
        <p class="card-text"> user email placeholder </p>
      </div>
    </div>
  </div>
</div>
{/* Quiz Button */}
<div>
  <a 
  href="quiz-form-placeholder" 
  target="_blank"
  className='quiz-button'> 
  <Button> Take Quiz! </Button>
  </a>

</div>
</main>
);