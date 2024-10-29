import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import UserMenu from "./UserMenu";

const DashboardLayout = ({ children }) => {
  const navigate = useNavigate(); // Initialize useNavigate
  const { isAuthenticated } = useSelector((state) => state.auth); // Get authentication state

  useEffect(() => {
    // Check if the user is not authenticated
    if (!isAuthenticated) {
      navigate("/"); // Redirect to home if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex mx-4 mt-4">
      {/* Sidebar */}
      <UserMenu />
      {/* Main Content */}
      <div className="flex-1 p-4">{children}</div>
    </div>
  );
};

export default DashboardLayout;
