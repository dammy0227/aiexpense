import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = ({ collapsed, mobileMenu, setMobileMenu }) => {
  const getNavLinkClass = ({ isActive }) =>
    isActive ? "sidebar-link active" : "sidebar-link";

  // 👇 Close sidebar when a link is clicked on mobile
  const handleLinkClick = () => {
    if (window.innerWidth <= 768) {
      setMobileMenu(false);
    }
  };

  return (
    <aside
      className={`sidebar ${collapsed ? "collapsed" : ""} ${
        mobileMenu ? "mobile-active" : ""
      }`}
    >
      <ul>
        <li>
          <NavLink to="/dashboard" className={getNavLinkClass} onClick={handleLinkClick}>
            <span className="icon">🏠</span>
            <span className="label">Dashboard</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/transactions" className={getNavLinkClass} onClick={handleLinkClick}>
            <span className="icon">💳</span>
            <span className="label">Transactions</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/smart-budget" className={getNavLinkClass} onClick={handleLinkClick}>
            <span className="icon">📊</span>
            <span className="label">Smart Budget</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/reports" className={getNavLinkClass} onClick={handleLinkClick}>
            <span className="icon">📈</span>
            <span className="label">Reports</span>
          </NavLink>
        </li>
        <li>
          <NavLink to="/profile" className={getNavLinkClass} onClick={handleLinkClick}>
            <span className="icon">👤</span>
            <span className="label">Profile</span>
          </NavLink>
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
