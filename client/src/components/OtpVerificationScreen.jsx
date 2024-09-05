import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import apiService from "../utils/api";
import { useAuth } from "../context/AuthContext";
import LeftsideBanner from "./LeftsideBanner";
import '../styles/LoginScreen.css';

const Span =styled.span`
color:#2db74c`;


const OtpVerificationScreen = () => {
  const [otp, setOtp] = useState("");
  const { setIsOtpValidated } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending OTP for verification:", otp); 
      await apiService.verifyOtp({ otp }); 
      alert("OTP verified successfully");
      setIsOtpValidated(true);
      navigate("/reset-password");
    } catch (error) {
      console.error("OTP verification failed:", error.response?.data || error);
      setIsOtpValidated(false);
    }
  };


  return (
    <div className="container">
      <LeftsideBanner/>
      <div className="login-right">
      <h2>Verify OTP</h2>
      <p>Please Enter the OTP sent to Your register gmail</p>
      <form onSubmit={handleSubmit}>
      <div className="form-group">
      <div className="form-input">
      <i class="fa-solid fa-key"></i>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={4}  
              required
            />
          </div>
          </div>
        <p>Resend <Span>00:30</Span></p>
        <button className='login-button' type="submit">Verify OTP</button>
      </form>
    </div>
    </div>
  );
};

export default OtpVerificationScreen;