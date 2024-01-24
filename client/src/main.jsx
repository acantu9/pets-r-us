import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import SearchForm from './components/search/searchForm';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SearchForm />
  </React.StrictMode>,
)
