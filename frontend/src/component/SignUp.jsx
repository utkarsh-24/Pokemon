import { useState } from "react";
import "../styles/SignUp.css";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password || !username) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/api/auth/signup",
        { username, email, password }
      );
      if (response && response.data && response.data.success) {
        // Redirect to dashboard
        window.location.href = "/auth/login";
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if(error.response.data.message.includes("password")) {
        setError("Password must be 3 to 30 characters long and contain only letters and numbers.")
      } else {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className="signUp-form-container">
      <h2>SignUp</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="username"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">SignUp</button>
      </form>
      <div className="link">
        Already have an account?{" "}
        <Link to="/auth/login" className="login-link">
          Login
        </Link>
      </div>
    </div>
  );
};

export default SignUp;
