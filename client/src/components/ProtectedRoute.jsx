// eslint-disable-next-line no-unused-vars
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const { isOtpValidated } = useAuth(); 

  if (!isOtpValidated) {
    // Redirect to login if OTP is not validated
    navigate("/");
    return null;
  }

  return children; // Render children if OTP is validated
};

export default ProtectedRoute;
