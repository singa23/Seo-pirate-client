import React from "react";
import { Link } from "react-router-dom";
import "./homePage.css";
import logo from "../assets/Logo.png";

function HomePage() {
  return (
    <div className="HomePage">
      <img className="logoContainer" src={logo} alt="logo" />
      <div className="section1">
        {" "}
        <nav className="navbar">
          <ul>
            <li>
              <Link to="/homepage">Home</Link>
            </li>
            <li>
              <Link to="/website">My Website</Link>
            </li>
            <li>
              <Link to="/profile">Profile</Link>
            </li>
            <li>
              <Link to="/logout">Log Out</Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="section2"></div>
    </div>
  );
}

export default HomePage;
