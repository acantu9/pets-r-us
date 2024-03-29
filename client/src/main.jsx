import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx'
import Signup from './pages/Signup';
import Login from './pages/Login';
import Search from './pages/Search';
import User_profile from './pages/User-Profile.jsx';
import Results from './pages/resultsPage.jsx';
//import './index.css'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/signup',
        element: <Signup />
      },
      {
        path: "/Search",
        element: <Search />
      },
      {
        path: "/User_Profile",
        element: <User_profile />
      },
      {
        path: "/Results",
        element: <Results />
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
