import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/auth/authThunk";
import { useNavigate, Link } from "react-router-dom";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error } = useSelector((state) => state.auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
  };

  return (
    <div className="login-container">
      {/* Navbar */}
      <nav className="nav">
        <div className="logo">SmartBudget AI</div>
      </nav>

      {/* Main Section */}
 <div className="login-content">
  <div className="info-section">
    <h1>Take Control of Your Finances with AI</h1>
    <p>
      Login to your SmartBudget AI account to manage your finances,
      track expenses, and make smarter decisions.
    </p>
    <p className="highlight">
      Your personalized financial insights are just a login away.
    </p>
  </div>

  <form className="login-form" onSubmit={handleSubmit}>
    <h2>Login</h2>

    <label>Email</label>
    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Enter your email"
      required
    />

    <label>Password</label>
    <input
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder="Enter your password"
      required
    />

    <button type="submit" disabled={loading}>
      {loading ? "Logging in..." : "Login"}
    </button>

    {error && <p className="error">{error}</p>}

    <p className="login-text">
      Don't have an account? <Link to="/register">Register</Link>
    </p>
  </form>
</div>

    </div>
  );
};

export default Login;
