// ContinueButton.jsx
import React from 'react';

const ContinueButton = ({ children,nextStep, agreed }) => {
  return (
    <button
      id="nextBtn"
      onClick={nextStep}
      disabled={!agreed} // Disable button if terms not agreed
      className={`py-4 px-4 rounded w-1/2 ${
        agreed
          ? "bg-afro-brown text-white cursor-pointer"
          : "bg-gray-400 text-gray-700 cursor-not-allowed"
      }`}
    >
      {children}
    </button>
  );
};

export default ContinueButton;
