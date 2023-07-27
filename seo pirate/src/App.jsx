import { Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Register from "./components/Register";
import IsPrivate from "./components/IsPrivate";
import { AuthProvider } from "./context/auth.context";
import Profile from "./components/Profile";

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
      </Routes>
    </AuthProvider>
  );
}

export default App;
