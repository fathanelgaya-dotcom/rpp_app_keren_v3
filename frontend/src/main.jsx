import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './style.css'; // optional, kalau mau pakai CSS global

// Root React
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
