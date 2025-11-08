import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import "./DashboardLayout.css";

const DashboardLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleSidebar = () => setCollapsed(!collapsed);
  const toggleMobileMenu = () => setMobileMenu(!mobileMenu);

  return (
    <div className={`dashboard-wrapper ${collapsed ? "collapsed" : ""}`}>
      <Sidebar collapsed={collapsed} mobileMenu={mobileMenu} />
      <div className="main-content">
        <Navbar
          toggleSidebar={toggleSidebar}
          toggleMobileMenu={toggleMobileMenu}
          mobileMenu={mobileMenu}
        />
        <div className="page-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
