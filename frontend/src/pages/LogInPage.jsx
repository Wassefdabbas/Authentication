import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";

const LogInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();


  const { login, error, isLoading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Welcome Back
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email */}
        <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-3 py-2">
          <Mail className="w-5 h-5 text-green-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
            required
          />
        </div>

        {/* Password */}
        <div className="flex items-center bg-gray-800 rounded-lg px-3 py-2">
          <Lock className="w-5 h-5 text-green-400" />
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 flex-1 ml-3"
            required
          />
          <button
            type="button"
            className="ml-2 text-gray-400 hover:text-green-400"
            onClick={() => setShowPassword((prev) => !prev)}
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>

        <div className="flex items-center mb-6">
            <Link to='/forget-password' className='text-sm text-green-400 hover:underline'>
                Forgot Password
            </Link>
        </div>
        {error && <p className="text-red-500 font-semibold mt-2"> {error} </p>}
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-all duration-300"
        >
          {isLoading ? <Loader className="w-6 h-6 animate-spin mx-auto"/> : 'Log In'}
        </button>
      </form>

      <p className="text-gray-400 text-center mt-4">
        Create New Account?{" "}
        <Link to="/signup" className="text-green-400 hover:underline">
          Sign Up
        </Link>
      </p>
    </div>
  );
};

export default LogInPage;
