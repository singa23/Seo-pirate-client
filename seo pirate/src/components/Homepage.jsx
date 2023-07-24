import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homePage.css";
import logo from "../assets/Logo.png";
import closechest from "../assets/closechest.png";
import openchest from "../assets/openchest.png";

function HomePage() {
  const [chestImage, setChestImage] = useState(closechest);
  const navigate = useNavigate();

  return (
    <div className="HomePage">
      <img className="logoContainer" src={logo} alt="logo" />
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
      <div className="section1">
        <div className="text-container">
          <h2>
            Seo Pirate allows you to retrieve content from any site{" "}
            <span>to analyse the different tags used by your competitors</span>{" "}
            Get on the adventure!{" "}
          </h2>
          <img
            className="chestImage"
            src={chestImage}
            alt="Treasure Chest"
            onMouseOver={() => setChestImage(openchest)}
            onMouseOut={() => setChestImage(closechest)}
            onClick={() => navigate("/mywebsite")}
          />
        </div>
      </div>
      <div className="section2">
        <div className="transparentContainer"></div>
      </div>
    </div>
  );
}

export default HomePage;
