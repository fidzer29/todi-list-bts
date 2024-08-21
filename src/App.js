import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { saveToken, getToken, removeToken } from "./services/authService";

function App() {
  const [token, setTokenState] = useState(getToken());

  const setToken = (token) => {
    setTokenState(token);
    saveToken(token);
  };

  const handleLogout = () => {
    setTokenState(null);
    removeToken();
  };

  return (
    <Router>
      <div>
        {token && <button onClick={handleLogout}>Logout</button>}
        <Routes>
          <Route
            path="/login"
            element={
              !token ? (
                <Login setToken={setToken} />
              ) : (
                <Navigate to="/dashboard" />
              )
            }
          />
          <Route path="/register" element={<Register />} />
          <Route
            path="/dashboard"
            element={
              token ? <Dashboard token={token} /> : <Navigate to="/login" />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
