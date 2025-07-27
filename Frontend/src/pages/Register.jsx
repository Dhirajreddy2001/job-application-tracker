import React, {useState} from "react";
import { useNavigate } from "react-router-dom";


const Register = () => {
    const navigate = useNavigate();
    
    const API_BASE_URL= process.env.REACT_APP_API_URL;
     
    const [firstName, setFirstname] = useState("");
    const [lastName, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [dob, setDob] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [gender, setGender] = useState("");

    const handleRegister = async (e) =>{

        e.preventDefault();

        const userData = {
            firstName,
            lastName,
            email,
            password,
            dob,
            gender,
            phoneNumber,
        };
        if (password !== confirmPassword) 
        {
            alert("Passwords do not match");
            return;
        }
        try{
            const response = await fetch(`${API_BASE_URL}/api/users`,{
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if(response.ok){
                alert("Registration Successful!");
                navigate("/");
            } else {
                const data = await response.text();
                alert(`Registration failed: ${data}`);
            }
        }catch(error) {
            console.error("Error during registration:", error);
            alert("An error occurred during registration. Please try again.");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-4">
            <div className="w-full max-w-2xl bg-white/60 backdrop-blur-md shadow-xl rounded-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-blue-900 mb-6">
                    Create Account
                </h2>
                <form className="space-y-4" onSubmit={handleRegister}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                            type="text"
                            value = {firstName}
                            placeholder="First Name"
                            className="w-full px-4 py-2 border border-graay-300 rounded-lg"
                            onChange={(e) => setFirstname(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={lastName}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            onChange={(e) => setLastname(e.target.value)}
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                            required
                        />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-2 text-sm text-blue-600"
                                >
                                {showPassword ? "Hide" : "Show"}
                                </button>  
                        </div>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg pr-10"
                                required
                                minLength={8}
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-2 text-sm text-blue-600"
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <select
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={gender}
                                    onChange={(e) => setGender(e.target.value)}
                                    required
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                
                            </div>
                                <input
                                    type="tel"
                                    placeholder="Phone Number"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    required
                                    pattern="[0-9]{10}"
                                />

                                <input
                                    type="date"
                                    placeholder="Date of Birth(YYYY-MM-DD)"
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-blue-700 text-white py-2 rounded-lg hover:bg-blue-800 transition"
                                >
                                    Sign Up
                                </button>

                </form>
                <p className="text-sm text-center text-gray-700 mt-4">
                    Already Existing User?{" "}
                    <span
                        className="text-blue-700 font-semibold cursor-pointer"
                        onClick={() => navigate("/")}
                    >
                        Login
                    </span> 
                </p>
                </div>


        </div>
    );
};
export default Register;