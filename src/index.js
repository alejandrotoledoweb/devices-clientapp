import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import './styles/index.css';
import App from './components/App';
import Devices from './components/Devices';
import NewDevice from './components/NewDevice';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <App />
    <Switch>
      <Route exact path="/" component={Devices} />
      <Route to="/newdevice" component={NewDevice} />
    </Switch>
  </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

