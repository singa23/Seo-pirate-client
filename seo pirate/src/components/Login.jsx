import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5005";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputUsername = (e) => {
    setUsername(e.target.value);
  };
  const handleInputPassword = (e) => {
    setPassword(e.target.value);
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const body = { username, password };
    axios
      .post(`${API_URL}/api/login`, body)
      .then((response) => {
        // Handle login logic here
        console.log("Login successful");
        navigate("/homepage"); // navigate to the dashboard or any other page after successful login
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="loginPage">
      <form onSubmit={handleSubmit}>
        <div className="champ">
          <h1>Login</h1>
          <label>
            Username
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleInputUsername}
            />
          </label>

          <label>
            Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleInputPassword}
            />
          </label>

          <button type="submit">Log in</button>
        </div>
        <div className="createPart">
          <h2>Don't have an SEO Pirate account?</h2>
          <button onClick={() => navigate("/register")}>Register</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
