import React from "react";
import ReactDOM from "react-dom"; // For rendering the modal in a portal

const Modal = ({ title, children, onClose }) => {
  // Render the modal inside a portal to ensure it's above other content
  return ReactDOM.createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full">
        {/* Modal header with close button */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 font-bold bg-transparent"
          >
            &times; {/* Close (X) icon */}
          </button>
        </div>

        {/* Modal content */}
        <div>{children}</div>
      </div>
    </div>,
    document.body // Render this modal into the body of the HTML document
  );
};

export default Modal;
