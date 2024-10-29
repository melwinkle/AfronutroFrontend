import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = (e) => {
    e.preventDefault();
    
    if (window.history.state && window.history.state.idx > 0) {
      // If there's history to go back to, use navigate(-1)
      navigate(-1);
    } else {
      // If there's no history, go to the home page
      navigate('/', { replace: true });
    }
  };
  return <a href="#" onClick={handleClick} className=" text-afro-brown  py-2 flex "><svg class="w-6 h-6 text-afro-brown " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 12h14M5 12l4-4m-4 4 4 4"/>
</svg>
Go Back</a>;
};
export default BackButton;
