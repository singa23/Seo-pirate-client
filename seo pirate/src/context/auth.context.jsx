import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const logInUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, credentials);
      const token = response.data.token;
      localStorage.setItem("authToken", token);
      setIsLoggedIn(true);
      setUser(response.data.user);
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      axios
        .get(`${API_URL}/api/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          setIsLoggedIn(true);
          setUser(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
          localStorage.removeItem("authToken"); // remove invalid token
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, [setIsLoggedIn, setUser]); // ajout de setIsLoggedIn et setUser aux dépendances

  // log the current auth state each time it changes
  useEffect(() => {
    console.log("Current auth state:", { isLoggedIn, isLoading, user });
  }, [isLoggedIn, isLoading, user]);

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, logInUser }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper as AuthProvider, AuthContext };
