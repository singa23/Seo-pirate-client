import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homePage.css";
import logo from "../assets/Logo.png";
import closechest from "../assets/closechest.png";
import openchest from "../assets/openchest.png";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import deleteIcon from "../assets/delete.png";
import settingsIcon from "../assets/settings.png";

function HomePage() {
  const [chestImage, setChestImage] = useState(closechest);
  const navigate = useNavigate();
  const { logOutUser } = useContext(AuthContext);
  const API_URL = "http://localhost:5005";
  const [websites, setWebsites] = useState([]);

  const token = localStorage.getItem("authToken");

  useEffect(() => {
    // Fetch the websites when the component mounts
    axios
      .get(`${API_URL}/api/websites`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setWebsites(response.data);
      })
      .catch((error) => {
        console.error("Could not fetch websites:", error);
      });
  }, []);

  const handleDeleteWebsite = (id) => {
    axios
      .delete(`${API_URL}/api/websites/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        // Remove the deleted website from the state
        setWebsites(websites.filter((website) => website._id !== id));
      })
      .catch((error) => {
        console.error("Could not delete website:", error);
      });
  };

  const handleSettingsWebsite = (id) => {
    navigate(`/my-website/${id}`);
  };

  return (
    <div className="HomePage">
      <img className="logoContainer" src={logo} alt="logo" />
      <nav className="navbar">
        <ul>
          <li>
            <Link to="/homepage">Home</Link>
          </li>
          <li>
            <Link to="/my-website">My Website</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/" onClick={logOutUser}>
              Log Out
            </Link>
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
            onClick={() => navigate("/my-website")}
          />
        </div>
      </div>
      <div className="section2">
        <div className="transparentContainer" style={{ overflowY: "auto" }}>
          {websites.map((website) => (
            <div
              key={website._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2 style={{ color: "black", marginLeft: "40px" }}>
                {website.name}
              </h2>
              <div>
                <img
                  src={settingsIcon}
                  alt="settings"
                  style={{ cursor: "pointer", marginLeft: "10px" }}
                  onClick={() => handleSettingsWebsite(website._id)}
                />
                <img
                  src={deleteIcon}
                  alt="delete"
                  style={{
                    cursor: "pointer",
                    marginLeft: "10px",
                    marginRight: "30px",
                  }}
                  onClick={() => handleDeleteWebsite(website._id)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
