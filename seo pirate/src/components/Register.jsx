import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./register.css";
import logo from "../assets/Logo.png";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");

  const navigate = useNavigate();

  const serverURL = "http://localhost:5005";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    if (email !== confirmEmail) {
      alert("Emails do not match");
      return;
    }

    const body = { username, email, password };
    axios
      .post(`${serverURL}/api/register`, body)
      .then((response) => {
        console.log("Registration successful");
        navigate("/login");
      })
      .catch((error) => console.error("Registration failed", error));
  };

  return (
    <div className="registerPage">
      <img className="logoContainer" src={logo} alt="logo" />
      <div className="formContainer">
        <form onSubmit={handleSubmit}>
          <label className="inputFull">
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Email:
            <input
              type="email"
              value={confirmEmail}
              onChange={(e) => setConfirmEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label>
            Confirm Password:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <input type="submit" value="Register" className="inputFull BTN" />
          <div className="inputFull">
            <p>Already have an SEO Pirate account?</p>
            <button
              onClick={(e) => {
                e.preventDefault();
                navigate("/login");
              }}
            >
              Log in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
