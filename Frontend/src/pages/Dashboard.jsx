import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [username, setUsername] = useState("");
  const [recentApplications, setRecentApplications] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserAndApplications = async () => {
      try {
        
        const userResponse = await axios.get("http://localhost:8080/api/users/me", {
          withCredentials: true,
        });
        setUsername(userResponse.data.firstName);
        //console.log("User data:", userResponse.data);

       
        const appsResponse = await axios.get("http://localhost:8080/api/jobs/recents", {
          withCredentials: true,
        });
        setRecentApplications(appsResponse.data);
      } catch (error) {
        console.error("Error fetching user or applications:", error);
        if (error.response && error.response.status === 401) {
          navigate("/"); // Unauthorized → redirect to login
        } else {
          console.error("Failed to fetch data:", error);
        }
      }
    };

    fetchUserAndApplications();
  }, [navigate]);

  const handleAddApplication = () => {
    navigate("/new-application");
  };

  return (
    <div className="bg-blue-50 p-8 min-h-screen w-full">
      <h1 className="text-3xl font-bold text-blue-900 mb-2">Dashboard</h1>
      <p className="text-blue-800 text-lg mb-4">Welcome, {username || "User"}</p>

      <div className="bg-white shadow-md rounded-xl p-6 mb-6">
  <h2 className="text-xl font-semibold text-gray-800 mb-2">Recent Applications</h2>
  {recentApplications.length > 0 ? (
    <ul className="space-y-4">
      {recentApplications.map((app) => (
        <li key={app.id} className="p-3 border rounded-lg">
          <p className="font-semibold text-gray-800">{app.roleName}</p>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
  app.status === 'Applied' ? 'bg-blue-100 text-blue-800' :
  app.status === 'Interview' ? 'bg-green-100 text-green-800' :
  app.status === 'Rejected' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
}`}>
  {app.status}
</span>

          <p className="text-gray-600">{app.companyName}</p>
          <p className="text-gray-500 text-sm">
            {new Date(app.createdAt).toLocaleDateString()}
          </p>
        </li>
      ))}
    </ul>
  ) : (
    <p className="text-gray-500">No applications yet.</p>
  )}
</div>


      <div>
        <button
          onClick= {() => handleAddApplication()}
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-800 transition"
        >
          Add Application
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
