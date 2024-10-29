import React, { useState } from "react";

const FAQAccordion = ({ children, header }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className=" border border-gray-200  rounded-md ">
      <h2>
        <button
          type="button"
          className={`flex items-center justify-between w-full py-5 font-bold text-left text-afro-dark   focus:outline-none outline-none hover:bg-transparent hover:border-none hover:shadow-none ${isOpen ?"bg-white":"bg-afro-gray-light"}`}
          onClick={toggleAccordion}
        >
          <span>{header}</span>
          <svg
            className={`w-3 h-3 shrink-0 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 10 6"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5 5 1 1 5"
            />
          </svg>
        </button>
      </h2>
      <div
        className={`py-5 mx-4 ${isOpen ? "block" : "hidden"}`}
      >
        <p className="mb-2 text-gray-500 dark:text-gray-400">
          {children}
        </p>
      </div>
    </div>
  );
};

export default FAQAccordion;