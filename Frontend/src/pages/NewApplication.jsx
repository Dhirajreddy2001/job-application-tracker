import React,{useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const NewApplication = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = React.useState({
        roleName: "",
        applicationDate: "",
        companyName: "",
        jobDescription: "",
        jobId:"",
        salaryRange:"",
        location: "",
        status: "Applied",
        notes: ""
    });

const [error, setError] = useState("");
const API_BASE_URL= process.env.REACT_APP_API_URL;
const handleChange = (e) => {
    const {name, value} = e.target;
    setFormData((prev) => ({...prev, [name] : value}));

};

const handleSubmit = async (e) => {
    e.preventDefault();
    try{
        const res = await axios.post(`${API_BASE_URL}/api/jobs`, formData,{
        withCredentials: true,
        });
        console.log(res.data);
        navigate("/applications");
    }catch(err)
    {
        console.error(err);
        setError("Failed to submit application.");

    }
    }

return(
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 shadow-lg rounded-xl">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add New Application</h2>

        {error && <p className="text-red-600 mb-4">{error}</p>}
        
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Role Name</label> 
            <input
                type="text"
                name="roleName"
                placeholder="Role Name"
                value={formData.roleName}
                onChange={handleChange}
                required
                maxLength={50}
                className="border px-3 py-2 rounded-md"
            />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Application Date</label> 
            <input
                type="date"
                name="applicationDate"
                value={formData.applicationDate}
                onChange={handleChange}
                required
                className="border px-3 py-2 rounded-md"
            />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Company Name</label> 
            <input
                type="text"
                name="companyName"
                placeholder="Company Name"
                value={formData.companyName}
                onChange={handleChange}
                required
                maxLength={50}
                className="border px-3 py-2 rounded-md"
            />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Job Description</label> 
            <input
                
                name="jobDescription"
                placeholder="Job Description"
                value={formData.jobDescription}
                onChange={handleChange}
                required
                maxLength={50}
                className="border px-3 py-2 rounded-md"
            />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Job ID</label> 
            <input 
                type="text"
                name="jobId"
                placeholder="Job ID{optional)"
                value={formData.jobId}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
            />
        </div>
        <div className = "flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Salary Range</label> 
            <input
                type="text"
                name="salaryRange"
                placeholder="Salary Range"
                value={formData.salaryRange}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
            />
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Job Location</label> 
            <input
                type="text"
                name="location"
                placeholder="Location"
                value={formData.location}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
            />
            <br></br>
        </div>
        <div>
            <label className="text-sm font-medium text-gray-700 mb-1">Status</label> 
            <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border px-3 py-2 rounded-md"
            >
                <option value="Applied">Applied</option>
                <option value="Interview">Interview</option>
                <option value="Offer">Offer</option>
                <option value="Rejected">Rejected</option>
            </select>
        </div>
        <div className="flex flex-col">
            <label className="text-sm font-medium text-gray-700 mb-1">Notes</label> 
            <textarea

                name="notes"
                placeholder="Additional Notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
                className="border px-3 py-2 rounded-md"
            />
            <br></br>
        </div>
        <div>
            <button
             type="submit"
             className="bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
                Submit Application
             </button>
        </div>

        </form>
        
    </div>
);
};
export default NewApplication;
