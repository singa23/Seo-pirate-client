import React from "react";
import "./mywebsite.css";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/auth.context";
import axios from "axios";
import { useState } from "react";

const API_URL = "http://localhost:5005";

function MyWebsites() {
  const { user, logOutUser } = useContext(AuthContext);
  const [newWebsite, setNewWebsite] = useState({ name: "", url: "" });
  const [editWebsite, setEditWebsite] = useState({ name: "", url: "" });

  const handleNewWebsiteChange = (event) => {
    setNewWebsite({ ...newWebsite, [event.target.name]: event.target.value });
  };

  const handleEditWebsiteChange = (event) => {
    setEditWebsite({ ...editWebsite, [event.target.name]: event.target.value });
  };

  const handleNewWebsiteSubmit = async (event) => {
    event.preventDefault();
    try {
      const websiteData = { ...newWebsite, userId: user._id }; // Add user ID to the website data
      await axios.post(`${API_URL}/api/websites`, websiteData, {
        // Use websiteData instead of newWebsite
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        },
      });
      // Handle successful submission
      // Load websites again after adding a new one
    } catch (error) {
      console.error(error);
      // Handle submission error
    }
  };

  const handleEditWebsiteSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `${API_URL}/api/websites/${editWebsite.id}`,
        editWebsite,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );
      // Handle successful submission
      // Load websites again after editing
    } catch (error) {
      console.error(error);
      // Handle submission error
    }
  };

  return (
    <div className="MyWebsite">
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
      <div className="transparentcontainer">
        <div className="topContainer1">
          {" "}
          <h2>Add a new website</h2>
          <span>
            <label>Website URL:</label>
            <input
              type="text"
              placeholder="Enter website URL"
              name="url"
              value={newWebsite.url}
              onChange={handleNewWebsiteChange}
            />
          </span>
          <span>
            <label>Website Name:</label>
            <input
              type="text"
              placeholder="Enter website name"
              name="name"
              value={newWebsite.name}
              onChange={handleNewWebsiteChange}
            />
          </span>
          <button onClick={handleNewWebsiteSubmit}>Add</button>
        </div>
        <div className="topContainer2">
          <h2>Modify a website</h2>

          <span>
            <label>Website URL:</label>
            <input
              type="text"
              placeholder="Enter website URL"
              name="url"
              value={editWebsite.url}
              onChange={handleEditWebsiteChange}
            />
          </span>

          <span>
            <label>Website Name:</label>
            <input
              type="text"
              placeholder="Enter website name"
              name="name"
              value={editWebsite.name}
              onChange={handleEditWebsiteChange}
            />
          </span>

          <button onClick={handleEditWebsiteSubmit}>Modify</button>
        </div>
        <div className="bottomContainer">
          {" "}
          <h2>My Website Details</h2>
        </div>
      </div>
    </div>
  );
}

export default MyWebsites;
