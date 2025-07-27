import React from 'react';
import axios from 'axios';

const ApplicationsTable = ({ data, fetchApplications, page, setPage, totalPages }) => {
  
  if (!Array.isArray(data)) {
    return <p className="p-4 text-gray-600">Loading applications...</p>;
  }

  const API_BASE_URL = process.env.REACT_APP_API_URL;
  
  const userId = data[0]?.user?.id;

  const updateStatus = async (jobId, newStatus) => {
    try {
      if (!userId) {
        console.error("User ID not available");
        return;
      }

      await axios.patch(`${API_BASE_URL}/api/jobs/user/${userId}/job/${jobId}/status`, null, {
        params: { newStatus },
        withCredentials:true
      });
      fetchApplications();
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div>
      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Company</th>
            <th className="p-2">Position</th>
            <th className="p-2">Application Date</th>
            <th className="p-2">Status</th>
            <th className="p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="4" className="text-center text-gray-500 p-4">No job applications found.</td>
            </tr>
          ) : (
            data.map((job) => (
              <tr key={job.id} className="border-t">
                <td className="p-2">{job.companyName}</td>
                <td className="p-2">{job.roleName}</td>
                <td className="p-2">{job.applicationDate}</td>
                <td className="p-2">
                  <select
                    value={job.status}
                    onChange={(e) => updateStatus(job.id, e.target.value)}
                    className="border rounded px-2 py-1"
                  >
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Rejected">Rejected</option>
                    <option value="Offer">Offer</option>
                  </select>
                </td>
                <td className="p-2">
                 
                  <button className="text-blue-600 underline">Edit</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      
      <div className="flex justify-between mt-4">
        <button
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-3">Page {page + 1} of {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ApplicationsTable;
