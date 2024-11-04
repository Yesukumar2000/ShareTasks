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

  return children; 
};

export default ProtectedRoute;
