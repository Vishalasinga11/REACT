import React from "react";
import { Link } from "react-router-dom";
import './index.css'; // Import the CSS file here
 
import ust from "./ust.jpg"
function Navbar() {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="navbar-brand">
        <img 
            src={ust}
            alt="Logo" 
            className="im" // Adjust height and margin as needed
          />
          <Link to="/" className="navbar-item">Home</Link>
        </div>
        <div className="navbar-menu">
          <Link to="/add-student" className="navbar-item">Add Student</Link>
          <Link to="/display-students" className="navbar-item">Display Students</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
