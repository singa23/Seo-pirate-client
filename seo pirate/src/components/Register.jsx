import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const serverURL = "http://localhost:5005";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
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
    <div className="Register">
      <form onSubmit={handleSubmit}>
        <label>
          Username:
          <input
            type="text"
            value={username} // <-- Utilisez 'username' ici
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
        <input type="submit" value="Register" />
      </form>
    </div>
  );
}

export default Register;
