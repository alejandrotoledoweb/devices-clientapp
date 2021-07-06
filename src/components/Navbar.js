import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

const Navbar = () => {
  return (
    <main className="container d-flex rounded">
      <Link to="/" className="btn btn-link">
        All Devices
      </Link>
      <Link to="/newdevice" className="btn btn-link">
        New Device
      </Link>
    </main>
  );
};

export default Navbar;
