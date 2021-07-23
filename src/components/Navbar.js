import React from "react";
import { Link } from "react-router-dom";

import "../styles/navbar.css";

const Navbar = () => {
  return (
    <main className="w-25 container d-flex border-top border-bottom pt-3 pb-3 rounded mt-3 justify-content-around">
      <h4>Devices App</h4>
      <div>
      <Link to="/" className="btn btn-link">
        All Devices
      </Link>
      <Link to="/newdevice" className="btn btn-link">
        New Device
      </Link>
      </div>
      
    </main>
  );
};

export default Navbar;
