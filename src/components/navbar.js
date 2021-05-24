import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/navbar.css';

const Navbar = () => {
  <main className="navbar nav d-flex">
    <Link to="/" className="btn btn-primary">All Devices</Link>
    <Link to="/newdevice" className="btn btn-primary">Create new device</Link>
  </main>
}

export default Navbar;
