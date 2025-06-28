import React, {useState} from "react";
import axios from "axios";
import {FaGithub, FaGoogle} from "react-icons/fa";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [error, setError] = useState("");

    const handleLogin = async (e) =>{
        e.preventDefault();

        try{
            const response = await axios.post("http://localhost:8080/api/auth/login",
                {
                    email,
                    password,
                },
                {
                    withCredentials: true, // Include credentials for CORS
                }
            );
            console.log("Login successful:", response.data);
            setError(""); // Clear any previous error
        }catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password");
        }
    };
    return (
        <div className="min-h-screen flex items-center justify-center bg-gblue-50 px-4">
            <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-bold text-center text-blue-800 mb-6">Login</h2>

                <form className="space-y-5" onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                            required
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter password"
                            className="w-full mt-1 px-4 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"/>
                            required
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200">
                        Login
                    </button>
                </form>

                {/* Divider */}

                <div className="flex items-center my-4">
                    <div className="flex-grow h-px bg-gray-300"/>
                    <span className="px-3 text-sm text-gray-500">or</span> 
                    <div className="flex-grow h-px bg-gray-300"/>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                    <button
                        className="w-full flex item-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                        <FaGoogle className="mr-2"/> Login with Google
                    </button>
                    <button
                        className="w-full flex item-center justify-center gap-3 border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition">
                        <FaGithub className="mr-2"/> Login with GitHub
                    </button>
                </div>
                <p className="text-sm text-center text-gray-600 mt-4">
                        Don't have an account? <span className="text-blue-600 font-medium cursor-pointer">Sign-up</span>

                </p>  
            </div>
        </div>
    );
};
export default Login;