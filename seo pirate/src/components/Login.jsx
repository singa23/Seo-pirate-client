import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/auth.context";
import "./login.css";

function Login() {
  const { logInUser } = React.useContext(AuthContext);
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleInputUsername = (event) => {
    setUsername(event.target.value);
  };

  const handleInputPassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userCredentials = { username, password };
    try {
      await logInUser(userCredentials);
      navigate("/homepage");
    } catch (error) {
      console.error(error);
    }
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
