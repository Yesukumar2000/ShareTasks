import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiService from "../utils/api";
import LeftsideBanner from "./LeftsideBanner";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/LoginScreen.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await apiService.login({ email, password });
      console.log(response.user);
      navigate("/dashboard");
      alert("Welcome to ShareTask");
    } catch (error) {
      alert("Email and Password credentials are Invalid");
    }
  };

  return (
    <div className="container">
      <LeftsideBanner />
      <div className="login-right">
        <h2>Login</h2>
        <p>Please login to your account with the email ID and password</p>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email ID</label>
            <div className="form-input">
            <i class="fa-regular fa-envelope"></i>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            </div>
          </div>
          <div className="form-group">
            <label>Password</label>
            <div className="form-input">
            <i class="fa-solid fa-key"></i>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            </div>
          </div>
          <Link to="/forgot-password" className="forgot-password">
            Forgot Password?
          </Link>
          <button type="submit" className="login-button">
            Login
          </button>
          <br></br>
          <button
            type="button"
            onClick={() => {
              navigate("/Register");
            }}
            className="login-button">
            New User
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
