import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import App from './components/App';
import Devices from './components/Devices';
import Navbar from './components/Navbar';
import NewDevice from './components/NewDevice';


const Routes = () => (
  <BrowserRouter>
    <App />
    <Navbar />
    <main className="container">
      <Switch>
        <Route exact path="/" component={Devices} />
        <Route path="/newdevice" component={NewDevice} />

      </Switch>
    </main>
  </BrowserRouter>
);

export default Routes;