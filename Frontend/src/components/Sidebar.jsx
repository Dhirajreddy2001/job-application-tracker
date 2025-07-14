import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  // This function checks if the current path matches the target path
  const isActive = (path) => {
    return location.pathname === path
      ? 'bg-blue-100 text-blue-700'
      : 'text-gray-700 hover:bg-blue-50';
  };
  const handleLogout = async () => {
    try{
      const response = await fetch('http://localhost:8080/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
    });
    if(response.ok){
      localStorage.removeItem('isLoggedIn');//clearing loginstatus
      window.location.href = '/';
    } else {
      console.error('Logout failed'); 
    }
  } catch (error) {
    console.error('Error during logout:', error);
  }
};

  return (
    <div className="h-screen w-64 bg-white shadow-md p-6">
      {/* Sidebar Header */}
      <h2 className="text-2xl font-bold text-blue-700 mb-10">Job Tracker</h2>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-4 text-base font-medium">
        {/* Dashboard Link */}
        <Link
          to="/dashboard"
          className={`block px-4 py-2 rounded-lg ${isActive('/dashboard')}`}
        >
          Home
        </Link>

        {/* Applications Page Link */}
        <Link
          to="/applications"
          className={`block px-4 py-2 rounded-lg ${isActive('/pages/applications')}`}
        >
          Applications
        </Link>

        {/* Edit Profile Page Link */}
        <Link
          to="/dashboard/edit-profile"
          className={`block px-4 py-2 rounded-lg ${isActive('/dashboard/edit-profile')}`}
        >
          Edit Profile
        </Link>

        <button
          onClick={handleLogout}
          className="block px-4 py-2 rounded-lg text-red-600 hover:bg-red-50"
          > Logout

        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
