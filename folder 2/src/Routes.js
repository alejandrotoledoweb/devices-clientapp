import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/navbar';


const Routes = () => (
  <BrowserRouter>
    <Navbar />
    <main className="container">
      <Switch>
        <Route path="/" component={Home} />
      </Switch>
    </main>
  </BrowserRouter>
);

export default Routes;