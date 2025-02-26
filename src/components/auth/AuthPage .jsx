import React, { useState } from "react";
import "../../assets/css/Auth/authpage.css";
import { FaUser, FaEye, FaEyeSlash, FaLock } from "react-icons/fa";
import { useAuth } from "../../context/authContext"; // Import useAuth from the context

const AuthPage = () => {
  const [name, setname] = useState(""); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password_confirmation, setpassword_confirmation] = useState(""); // Added for password confirmation
  const [isSignUp, setIsSignUp] = useState(false); // Default to Sign In view
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState(""); // For form validation errors
  const { signUp, login } = useAuth(); // Destructure the authentication methods

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Simple client-side validation
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }
  
    if (isSignUp && !name) {
      setError("Full name is required");
      return;
    }
  
    if (isSignUp && password !== password_confirmation) {
      setError("Passwords do not match");
      return;
    }
  
    setError(""); // Clear any previous errors
  
    const userData = { name, email, password, password_confirmation }; // Add password_confirmation here
  
    if (isSignUp) {
      await signUp(userData); // Call the signUp method from AuthContext
    } else {
      await login(userData); // Call the login method from AuthContext
    }
  };
  
  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="auth-container-main-wrapper">
      <div className="auth-container">
        <div className="auth-left-container">
          <div className="dashboard-content-container">
            <h2>Welcome Back!</h2>
            <p>
              Sign in to continue shopping and enjoy an easy buying experience.
            </p>
            <p>
              New here? Create an account for quicker checkout and exclusive
              offers!
            </p>
          </div>
        </div>
        <div className="auth-right-container">
          <h1 className="auth-title">
            {isSignUp ? "Sign Up" : "Sign In"}
          </h1>
          {error && <div className="auth-error">{error}</div>}{" "}
          {/* Display errors */}
          <form onSubmit={handleSubmit} className="auth-form">
            {/* Full name field for Sign Up */}
            {isSignUp && (
              <div className="auth-form-group">
                <FaUser className="auth-icon" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder=" "
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  required
                  className="auth-input"
                />
                <label htmlFor="name" className="auth-label">
                  Full Name
                </label>
              </div>
            )}

            {/* Email field */}
            <div className="auth-form-group">
              <FaUser className="auth-icon" />
              <input
                type="email"
                name="email"
                id="email"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="auth-input"
              />
              <label htmlFor="email" className="auth-label">
                Email
              </label>
            </div>

            {/* Password field */}
            <div className="auth-form-group password-field">
              <FaLock className="auth-icon" />
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="auth-input"
              />
              <label htmlFor="password" className="auth-label">
                Password
              </label>
              <div
                className="auth-password-toggle"
                onClick={togglePasswordVisibility}
              >
                {passwordVisible ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>

            {/* Password confirmation field for Sign Up */}
            {isSignUp && (
              <div className="auth-form-group password-field">
                <FaLock className="auth-icon" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password_confirmation"
                  id="password_confirmation"
                  placeholder=" "
                  value={password_confirmation}
                  onChange={(e) => setpassword_confirmation(e.target.value)}
                  required
                  className="auth-input"
                />
                <label htmlFor="password_confirmation" className="auth-label">
                  Confirm Password
                </label>
                <div
                  className="auth-password-toggle"
                  onClick={togglePasswordVisibility}
                >
                  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            )}

            {/* Submit button */}
            <button type="submit" className="auth-btn">
              {isSignUp ? "Sign Up" : "Sign In"}
            </button>

            {/* Switch between Sign Up and Sign In */}
            <div className="auth-switch">
              <p
                onClick={() => setIsSignUp(!isSignUp)}
                className="auth-toggle"
              >
                {isSignUp
                  ? "Already have an account? Sign In"
                  : "Don't have an account? Sign Up"}
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
