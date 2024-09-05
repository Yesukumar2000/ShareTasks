import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginScreen from "./components/LoginScreen";
import ForgetPasswordScreen from "./components/ForgetPasswordScreen";
import OtpVerificationScreen from "./components/OtpVerificationScreen";
import ResetPasswordScreen from "./components/ResetPasswordScreen";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./context/AuthContext";
import RegisterScreen from "./components/RegisterScreen";
import DashBoard from "./components/DashBoard/DashBoard";

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/forgot-password" element={<ForgetPasswordScreen />} />
          <Route path="/otp-verification" element={<OtpVerificationScreen />} />
          <Route path="/reset-password"  element={<ProtectedRoute><ResetPasswordScreen /></ProtectedRoute>}/>
          <Route path="/dashboard" element={<DashBoard />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
