import React from "react";
import { Link } from "react-router-dom";

function HomePage() {
  return (
    <div className="HomePage">
      <h1>IronProfile</h1>
      <p>today we will create an app</p>
      <p>with authoritation, adding</p>
      <p>some cool styles!</p>

      <Link to="/register">
        <button>Sign up</button>
      </Link>
      <Link to="/login">
        <button>Log in</button>
      </Link>
    </div>
  );
}

export default HomePage;
