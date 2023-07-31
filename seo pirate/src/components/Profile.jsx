import React, { useState, useContext } from "react";
import axios from "axios";
import "./profile.css";
import logo from "../assets/Logo.png";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";

const API_URL = "http://localhost:5005";

function Profile() {
  const { user, logOutUser, updateUser } = useContext(AuthContext);
  const { email = "", username = "" } = user || {};

  const [selectedImage, setSelectedImage] = useState(
    localStorage.getItem("userImage") || ""
  );

  const images = [image1, image2, image3, image4, image5, image6];

  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdateUsername = async () => {
    await updateUser(user._id, newUsername);
  };

  const handleUpdatePassword = async () => {
    if (newPassword === confirmPassword) {
      await updateUser(user._id, username, newPassword);
    } else {
      alert("Passwords do not match");
    }
  };
  // Update localStorage whenever selectedImage changes
  useEffect(() => {
    localStorage.setItem("userImage", selectedImage);
  }, [selectedImage]);

  return (
    <div className="Profile">
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
      <div className="profileContainer">
        <div className="containerempty"></div>
        <div className="profileTop">
          <div className="profileImageContainer">
            <img src={selectedImage} className="profileImage" alt="profile" />
            <h2>Choose an Avatar</h2>
          </div>
          <div className="profileInfo">
            <div className="profileItem">
              <span className="profileLabel">
                <strong>Username:</strong>
              </span>
              {username}
              <input
                className="profileInput"
                type="text"
                placeholder="New username"
                value={newUsername}
                onChange={(e) => setNewUsername(e.target.value)}
              />
              <button className="changeButton" onClick={handleUpdateUsername}>
                Change
              </button>
            </div>
            <div className="profileItem">
              <span className="profileLabel">
                <strong>Email:</strong>
              </span>
              <span className="profileInput">{email}</span>
            </div>
            <div className="profileItem">
              <span className="profileLabel">
                <strong>Password:</strong> *****
              </span>
              <input
                className="profileInput"
                type="password"
                placeholder="New password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <input
                className="profileInput"
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
          <div className="imgcontainer">
            {images.map((image, index) => (
              <div
                className="imageChoice"
                key={index}
                onClick={() => setSelectedImage(image)}
              >
                <img src={image} alt={`Choice ${index + 1}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
