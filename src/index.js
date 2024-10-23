import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

// Render the root component into the #root div in the public/index.html
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
