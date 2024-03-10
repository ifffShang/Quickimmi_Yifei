import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Button } from "antd";
import { useDispatch } from "react-redux";
import { openModal } from "../../reducers/authSlice";

export function Navbar() {
  const dispatch = useDispatch();

  const login = () => {
    dispatch(openModal({ modalType: "signin" }));
  };

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
        <div className="navbar-profile">
          <Button type="link" onClick={login}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
}
