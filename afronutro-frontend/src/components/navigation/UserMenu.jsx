import React from "react";
import { Link, useLocation } from "react-router-dom";

const UserMenu = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="w-48  p-4 hidden md:flex md:flex-col">
        <p className="text-xl font-bold">Your Menu</p>
      <ul className="space-y-4">
        <li>
          <Link
            to="/profile"
            className={`block px-4 py-2 ${
              isActive("/profile")
                ? "text-afro-teal font-semibold border-l-2 border-afro-teal"
                : "text-gray-700"
            }`}
          >
            Profile
          </Link>
        </li>
        <li>
          <Link
            to="/favorites"
            className={`block px-4 py-2 ${
              isActive("/favorites")
                ? "text-afro-teal font-semibold border-l-2 border-afro-teal"
                : "text-gray-700"
            }`}
          >
            Favorites
          </Link>
        </li>
        <li>
          <Link
            to="/assessment"
            className={`block px-4 py-2 ${
              isActive("/assessment") 
                ? "text-afro-teal font-semibold border-l-2 border-afro-teal"
                : "text-gray-700"
            }`}
          >
            Dietary Assessment
          </Link>
        </li>
        <li>
          <Link
            to="/mealplan"
            className={`block px-4 py-2 ${
              isActive("/mealplan")|| window.location.pathname.startsWith("/mealplan/")
                ? "text-afro-teal font-semibold border-l-2 border-afro-teal"
                : "text-gray-700"
            }`}
          >
            Meal Plans
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default UserMenu;
