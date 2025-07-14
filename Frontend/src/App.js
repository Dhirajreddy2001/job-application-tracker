import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Sidebar from "./components/Sidebar";

import Login from "./pages/Login"; 
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Applications from "./pages/Applications";
import EditProfile from "./pages/EditProfile";
import NewApplication from "./pages/NewApplication";
import ApplicationDetails from "./pages/ApplicationDetails";

const AppLayout = () => {
  const location = useLocation();
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  const hideSidebarRoutes = ["/", "/register"];

  return (
    <div className="flex min-h-screen">
      
      {isLoggedIn && !hideSidebarRoutes.includes(location.pathname) && (
        <div className="w-64">
          <Sidebar />
        </div>
      )}

      {/* Main content area */}
      <div className="flex-1 p-6">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/applications" element={<ProtectedRoute><Applications /></ProtectedRoute>} />
          <Route path="/dashboard/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/new-application" element={<ProtectedRoute><NewApplication /></ProtectedRoute>} />
          <Route path="/application-details/:id" element={<ProtectedRoute><ApplicationDetails /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
};

export default App;
