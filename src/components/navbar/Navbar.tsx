import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <div className="navbar-container">
      <div className="navbar-group">
        <div className="navbar-logo">
          <Link to="/">Logo</Link>
        </div>
        <div className="navbar-menu">
          <Link to="/dashboard">Dashboard</Link>
        </div>
      </div>
      <div className="navbar-group">
        <div className="navbar-profile">Language</div>
        <div className="navbar-profile">Profile</div>
      </div>
    </div>
  );
}
