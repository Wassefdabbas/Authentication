import React, { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, Loader } from "lucide-react";
import PasswordStrengthMeter from "../components/PasswordStrength";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../utils/useAuth";

const SignUpPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  //   const [isLoading, setIsLoading] = useState(false);

  const { signup, error, isLoading } = useAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, email, password);
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-900 bg-opacity-70 backdrop-filter backdrop-blur-lg rounded-2xl shadow-xl p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-white">
        Create Account
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="flex items-center gap-3 bg-gray-800 rounded-lg px-3 py-2">
          <User className="w-5 h-5 text-green-400" />
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
            required
          />
        </div>

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

        {error && <p className="text-red-500 font-semibold mt-2"> {error} </p>}

        {/* Password Strength meter */}
        <PasswordStrengthMeter password={password} />
        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg transition-all duration-300"
          disabled={isLoading}
        >
          {isLoading ? (
            <Loader className="w-6 h-6 animate-spin mx-auto" />
          ) : (
            "Sign Up"
          )}
        </button>
      </form>

      <p className="text-gray-400 text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-green-400 hover:underline">
          Log In
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
