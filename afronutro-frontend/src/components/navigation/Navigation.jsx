import React, { useState,useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {  useSelector } from 'react-redux';
import CustomButton from "../common/CustomButton";
import navlogo from "../../assets/images/afronutrologov6.svg";
import afrocircle from "../../assets/images/account_circle.svg"
import AuthModal from '../auth/Auth.jsx';
import Login from '../auth/Login';
import Register from '../auth/Register';
import Logout from "../auth/Logout.jsx";
import SearchComponent from "../common/SearchComponent.jsx";

const Navigation = () => {
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const user = useSelector((state) => state.auth.user);

  const toggleUserDropdown = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  const isActiveLink = (path) => location.pathname === path;

  const [buttonText, setButtonText] = useState('Start');

  useEffect(() => {
    // Function to check screen size and update button text
    const updateButtonText = () => {
      if (window.innerWidth >= 1024) {  // lg screen size in Tailwind is 1024px
        setButtonText('Get Started');
      } else {
        setButtonText('Start');
      }
    };

    // Initial check
    updateButtonText();

    // Add event listener for window resize
    window.addEventListener('resize', updateButtonText);

    // Clean up the event listener when the component unmounts
    return () => window.removeEventListener('resize', updateButtonText);
  }, []);
  return (
    <nav class=" dark:bg-gray-900  w-full">
      <div className="w-full flex flex-wrap md:flex-nowrap items-center  p-2 ">
        <div className="flex items-center space-x-2  flex-grow ">
          <a
            href="https://flowbite.com/"
            className="flex items-center -space-x-3 rtl:space-x-reverse"
          >
            <img src={navlogo} className="h-16" alt="AfroNutro Logo" />
          </a>

          {/* Search Input */}
          {/* Replace the old search input with SearchComponent */}
          <div className="hidden md:block ml-2 lg:ml-4 w-2/5 lg:w-3/4">
            <SearchComponent />
          </div>
        </div>

        <div className="flex items-center md:order-2 space-x-2 lg:space-x-3 ">
          <ul className="hidden md:flex space-x-2 items-center justify-center">
            <li>
              <Link
                to="/"
                className={`py-2 px-2 ${
                  isActiveLink("/")
                    ? "text-afro-brown underline underline-offset-8"
                    : "text-gray-900"
                }  hover:text-afro-brown dark:text-white`}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/blog"
                className={`py-2 px-2 ${
                  isActiveLink("/blog") || window.location.pathname.startsWith("/blog/")
                    ? "text-afro-brown underline  underline-offset-8"
                    : "text-gray-900"
                }  hover:text-afro-brown dark:text-white`}
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                to="/recipes"
                className={`py-2 px-2 ${
                  isActiveLink("/recipes") || window.location.pathname.startsWith("/recipes/")
                    ? "text-afro-brown underline  underline-offset-8"
                    : "text-gray-900"
                }  hover:text-afro-brown dark:text-white`}
              >
                Recipes
              </Link>
            </li>
            <li>
              <Link
                to="/mealgenerator"
                className={`py-2 px-2 ${
                  isActiveLink("/mealgenerator")
                    ? "text-afro-brown underline underline-offset-8"
                    : "text-gray-900"
                }  hover:text-afro-brown dark:text-white`}
              >
                Meal Generator
              </Link>
            </li>
            <li>
              <Link
                to="/faqs"
                className={`py-2 px-2 ${
                  isActiveLink("/faqs")
                    ? "text-afro-brown underline underline-offset-8"
                    : "text-gray-900"
                }  hover:text-afro-brown dark:text-white`}
              >
                FAQs
              </Link>
            </li>
            {
              !isAuthenticated? (<li>
                <CustomButton onClick={() => setIsAuthModalOpen(true)}>
                {buttonText}
              </CustomButton>
                </li>):null
            }
            
          </ul>
         

            <div className="flex flex-row items-center justify-center space-x-1">
              <a href="#" aria-expanded={isUserDropdownOpen}
  onClick={toggleUserDropdown}>
              <img
              className="w-8 h-8 rounded-full"
              src={afrocircle}
              alt="user photo"
            />

              </a>
          <p className={`${isAuthenticated? "md:block hidden":"hidden"}`}>Hi,{user?user.username:"User"}!</p>

            </div>
          
          <div
            className={`z-50 ${
              isUserDropdownOpen ? "block" : "hidden"
            } absolute right-2 mt-6 w-48 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600`}
            id="user-dropdown"
            style={{ top: "3rem" }}
          >
            
            {
              isAuthenticated? (<div><div className="px-4 py-3">
                <span className="block text-sm text-gray-900 dark:text-white">
                {user?user.username:"User"}
                </span>
                <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
                {user?user.email:"aygd@afronutro.com"}
                </span>
              </div><ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Profile
                  </a>
                </li>
                <li>
                  <a
                    href="/assessment"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Dietary Assessment
                  </a>
                </li>
                <li>
                  <a
                    href="/mealplan"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Meal Plans
                  </a>
                </li>
                <li>
                  <a
                    href="/favorites"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Favorites
                  </a>
                </li>
                <li>
                  
                  <Logout/>
                </li>
              </ul></div>):(<div>
                <ul className="py-2" aria-labelledby="user-menu-button">
                <li>
                  <a
                    href="#"
                    onClick={() => setIsAuthModalOpen(true)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                  >
                    Register/Login
                  </a>
                
                </li>
               
              
              </ul>
              </div>
              )
            }
            
          </div>

          <button
            data-collapse-toggle="navbar-user"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden"
            onClick={toggleMobileMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>

        <div
          className={`${
            isMobileMenuOpen ? "block" : "hidden"
          } md:hidden w-full`}
          id="navbar-user"
        >
          <ul className="flex flex-col space-y-4 ">
            <li>
              <a href="/" className="block py-2 px-3 text-gray-900">
                Home
              </a>
            </li>
            <li>
              <a href="/blog" className="block py-2 px-3 text-gray-900">
                Blog
              </a>
            </li>
            <li>
              <a href="/recipes" className="block py-2 px-3 text-gray-900">
                Recipes
              </a>
            </li>
            <li>
              <a href="/mealgenerator" className="block py-2 px-3 text-gray-900">
                Meal Generator
              </a>
            </li>
            <li>
              <a href="/faqs" className="block py-2 px-3 text-gray-900">
                FAQs
              </a>
            </li>
            <li>
          
          {
              !isAuthenticated? (<li>
                <CustomButton onClick={() => setIsAuthModalOpen(true)}>
                Get Started
              </CustomButton>
                </li>):null
            }
            </li>
          </ul>
        </div>
      </div>
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={() => setIsAuthModalOpen(false)}
        LoginComponent={Login}
        RegisterComponent={Register}
      />
    </nav>
  );
};

export default Navigation;
