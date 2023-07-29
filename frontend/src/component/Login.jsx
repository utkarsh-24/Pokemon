import { useState } from "react";
import "../styles/Login.css";
import { Link } from "react-router-dom";
import axios from "axios"

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    try {
      const response = await axios.post(
        process.env.REACT_APP_API_BASE_URL + "/api/auth/login",
        { email, password }
      );
      if (response.data.success) {
        window.location.href = "/" + "?bearer=" + response.data.token;
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      if (error.response.data.message) setError(error.response.data.message);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Log In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div className="link">
        Don't have an account?{" "}
        <Link to="/auth/signUp" className="signUp-link">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;
