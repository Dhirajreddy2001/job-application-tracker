import React, {useState} from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {FaGithub, FaGoogle} from "react-icons/fa";
import {Link} from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");  
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const API_BASE_URL = process.env.REACT_APP_API_URL;

    const validatingLoginDetails = () => {
        if(!email || !password) {
            return "Email and password are required";
        }
        if(!/\S+@\S+\.\S+/.test(email)) {
            return "Please enter a valid email address";
        }
        if(password.length < 6) {
            return "Password must be at least 6 characters long";
        }
        return "";
    };

    const handleLogin = async (e) =>{
        e.preventDefault();

        const validationError = validatingLoginDetails();
        if(validationError) {
            setError(validationError);
            return;
        }

        try{
            const response = await axios.post(`${API_BASE_URL}/api/auth/login`,
                {
                    email,
                    password,
                },
                {
                    withCredentials: true, // Include credentials for CORS
                }
            );
            console.log("Login successful:", response.data);
            setError("");
            localStorage.setItem("isLoggedIn","true")
            navigate("/dashboard");

           
        }catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password");
        }
    };
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-200 from-cream-300  to-purple-200 flex items-center justify-center">
            <div className="backdrop-blur-md bg-white/30 border border-white/40 shadow-xl rounded-3xl p-8 w-full max-w-md">
                <h2 className="text-3xl font-semibold text-center text-blue drop-shadow-md mb-6">Login</h2>

                <form className="space-y-5" onSubmit={handleLogin}>
                    {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
                    <div>
                        <label className="text-sm font-medium text-blue-900">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter email"
                            className="w-full mt-1 px-4 py-2 border border-gray-300 rounded-xl bg-white focus:outline-none focus:ring-2 focus:ring-blue-400"/>

                    </div>
                    <div>
                        <label className="text-sm font-medium text-blue-900">Password</label>
                    <div className="relative">
                        <input
                            type={showPassword ? "text" : "password"}
                            placeholder="Enter password"
                            value={password}
                            required
                            minLength={8}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full mt-1 px-4 py-2 border border-grey-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-3 text-sm text-blue-600 ">

                            {showPassword ? "Hide" : "Show"}
                        </button>
                    </div>
                           
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
                    <span className="px-3 text-sm text-black-700">or</span> 
                    <div className="flex-grow h-px bg-gray-300"/>
                </div>

                {/* Social Login Buttons */}
                <div className="space-y-3">
                    <button
                        className="w-full flex item-center justify-center gap-3 border border-white/40 py-2  bg-white/60 rounded-lg hover:bg-gray-100 transition">
                        <FaGoogle className="mr-2"/> Login with Google
                    </button>
                    <button
                        className="w-full flex item-center justify-center gap-3 border border-white/40 py-2 bg-white/60 rounded-lg hover:bg-gray-100 transition">
                        <FaGithub className="mr-2"/> Login with GitHub
                    </button>
                </div>
                <p className="text-md text-center text-gray-600 mt-4">
                        Don't have an account? 
                        <Link to="/register" className="text-blue-600 font-lg cursor-pointer">
                        Sign-up
                        </Link>

                </p>  
            </div>
        </div>
    );
};
export default Login;