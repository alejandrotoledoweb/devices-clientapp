import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import Devices from './components/Devices';
import App from './components/App';


ReactDOM.render(
  <React.StrictMode>
    <App />
    <Devices />
  </React.StrictMode>,
  document.getElementById('root')
);

