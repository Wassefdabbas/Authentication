import React, { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router";
import SignUpPage from "./pages/SignUpPage";
import LogInPage from "./pages/LogInPage";
import VerifyEmailPage from "./pages/VerifyEmailPage";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./utils/Useauth";
import HomePage from "./pages/HomePage";
import { Loader } from "lucide-react";
import ForgetPasswordPage from "./pages/ForgetPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";

// protect router need auth
const ProtectRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />;
  }

  return children;
};



// if the user singup or login, can not access sign up, login page
const RedirectUser = ({children}) => {
  const { isAuthenticated, user } = useAuth();

  if(isAuthenticated && user?.isVerified) {
    return <Navigate to='/' replace />
  }
  return children
}

const App = () => {
  const {isCheckingAuth, checkAuth } = useAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if(isCheckingAuth) return <Loader className="w-6 h-6 animate-spin mx-auto" />
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center">
      <Routes>
        <Route path="/" element={<ProtectRoute> <HomePage /> </ProtectRoute>} />
        <Route path="/signup" element={<RedirectUser> <SignUpPage /> </RedirectUser>} />
        <Route path="/login" element={<RedirectUser> <LogInPage /> </RedirectUser>} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forget-password" element={<RedirectUser> <ForgetPasswordPage /> </RedirectUser>} />
        <Route path="/reset-password/:token" element={<RedirectUser> <ResetPasswordPage /> </RedirectUser>} />
      </Routes>

      <Toaster />
    </div>
  );
};

export default App;