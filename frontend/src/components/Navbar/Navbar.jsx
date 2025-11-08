import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../features/auth/authSlice";
import "./Navbar.css";

const Navbar = ({ toggleMobileMenu, mobileMenu }) => {
  const dispatch = useDispatch();
  const { name } = useSelector((state) => state.auth);

  const handleLogout = () => dispatch(logout());

  return (
    <nav className="navbar">
      <div className="navbar-left">
        {/* Hamburger (☰) and Cancel (✖) buttons */}
        <button
          className="hamburger mobile-only"
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          {mobileMenu ? "✖" : "☰"}
        </button>

      </div>
      <div className="navbar-right">
        <span className="user-name">{name}</span>
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
