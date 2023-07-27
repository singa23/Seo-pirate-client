import React, { useState, useContext } from "react";
import axios from "axios";
import "./profile.css";
import logo from "../assets/Logo.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";

const API_URL = "http://localhost:5005";

function Profile() {
  const { user, logOutUser, updateUser } = useContext(AuthContext);
  const { email = "", username = "" } = user || {};

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateUsername = () => {
    updateUser(user._id, newUsername, user.password);
  };

  const handleUpdatePassword = () => {
    if (newPassword === confirmPassword) {
      updateUser(user._id, username, newPassword);
    } else {
      alert("Passwords do not match");
    }
  };

  return (
    <div className="Profile">
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
            <Link to="/" onClick={logOutUser}>
              Log Out
            </Link>
          </li>
        </ul>
      </nav>
      <div className="profileContainer">
        <div className="profileTop">
          <div className="profileImageContainer">
            <div className="profileImage"></div>
            <button className="uploadButton">Upload Photo</button>
          </div>
          <div className="profileInfo">
            <div className="profileName">
              <span>Username: {username}</span>
              <input
                type="text"
                placeholder="New username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button className="changeButton" onClick={handleUpdateUsername}>
                Change
              </button>
            </div>
            <div className="profileEmail">
              <span>Email: {email}</span>
            </div>
            <div className="profilePassword">
              <span>Password: *****</span>
              <input
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button className="changeButton" onClick={handleUpdatePassword}>
                Change
              </button>
            </div>
          </div>
        </div>
        <div className="profileBottom">
          <div className="imageChoice">Image 1</div>
          <div className="imageChoice">Image 2</div>
          <div className="imageChoice">Image 3</div>
          <div className="imageChoice">Image 4</div>
          <div className="imageChoice">Image 5</div>
          <div className="imageChoice">Image 6</div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
