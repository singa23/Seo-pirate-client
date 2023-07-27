import React, { useState, useEffect } from "react";
import axios from "axios";
const API_URL = "http://localhost:5005";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  const loadUser = async () => {
    setIsLoading(true);
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const response = await axios.get(`${API_URL}/api/verify`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setIsLoggedIn(true);
        setUser(response.data);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("authToken"); // remove invalid token
      }
    }
    setIsLoading(false);
  };

  const updateUserProfile = async (userId, newUsername, newPassword) => {
    try {
      const response = await axios.put(
        `${API_URL}/api/user/${userId}`,
        { username: newUsername, password: newPassword },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          },
        }
      );

      if (response.data && response.data.user) {
        loadUser();
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logInUser = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, credentials);
      const { authToken, user } = response.data;
      localStorage.setItem("authToken", authToken);
      loadUser();
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const logOutUser = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    setUser(null);
  };

  useEffect(() => {
    loadUser();
  }, [setIsLoggedIn, setUser]);

  // log the current auth state each time it changes
  useEffect(() => {
    console.log("Current auth state:", { isLoggedIn, isLoading, user });
  }, [isLoggedIn, isLoading, user]);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        logInUser,
        logOutUser,
        updateUser: updateUserProfile,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper as AuthProvider, AuthContext };
