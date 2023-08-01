import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import IsPrivate from "./components/IsPrivate";
import { AuthProvider } from "./context/auth.context";
import Profile from "./components/Profile";
import MyWebsites from "./components/MyWebsite";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/profile"
          element={
            <IsPrivate>
              <Profile />
            </IsPrivate>
          }
        />

        <Route
          path="/homepage"
          element={
            <IsPrivate>
              <Homepage />
            </IsPrivate>
          }
        />
        <Route
          path="/my-website/:id"
          element={
            <IsPrivate>
              <MyWebsites />
            </IsPrivate>
          }
        />
        <Route
          path="/my-website"
          element={
            <IsPrivate>
              <MyWebsites />
            </IsPrivate>
          }
        />
      </Routes>
    </AuthProvider>
  );
}

export default App;
