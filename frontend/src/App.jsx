import React from "react";
import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import Register from "./pages/Register";
import Problems from "./pages/Problems";
import Login from "./pages/Login";
import ProblemDetails from "./pages/ProblemDetails";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/problems" element={<Problems />} />
        <Route
          path="/problem/:slug"
          element={
            <ProtectedRoute>
              <ProblemDetails />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
