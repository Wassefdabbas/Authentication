import { useState } from "react";
import { useAuth } from "../utils/Useauth";
import { useNavigate, useParams } from "react-router";
import { Eye, EyeOff, Lock } from "lucide-react";
import toast from "react-hot-toast";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPassword, error, isLoading, message } = useAuth();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword(token, password);

      toast.success("Password reset successfully, redirecting...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Error resetting password");
    }
  };

  return (
    <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
      <div className="p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Reset Password
        </h2>

        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-4">{message}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* New Password */}
          <div className="flex items-center gap-3 bg-gray-700 rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-green-400" />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
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

          {/* Confirm Password */}
          <div className="flex items-center gap-3 bg-gray-700 rounded-lg px-3 py-2">
            <Lock className="w-5 h-5 text-green-400" />
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm New Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="bg-transparent outline-none text-white placeholder-gray-400 flex-1"
              required
            />
            <button
              type="button"
              className="ml-2 text-gray-400 hover:text-green-400"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
            >
              {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition duration-200"
          >
            {isLoading ? "Resetting..." : "Set New Password"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordPage;
