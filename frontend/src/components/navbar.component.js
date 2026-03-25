import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <nav className="app-navbar">
        <div className="navbar-inner">
          <Link to="/" className="navbar-logo">
            <span className="logo-icon">💪</span>
            <span className="logo-text">ExerciseTracker</span>
          </Link>
          <ul className="navbar-links">
            <li>
              <NavLink to="/" end className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Exercises
              </NavLink>
            </li>
            <li>
              <NavLink to="/create" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Log Exercise
              </NavLink>
            </li>
            <li>
              <NavLink to="/user" className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}>
                Add User
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}