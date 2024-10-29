import React from "react";

const ProfileCircle = ({ children, title, borderColor,info }) => {
  // Map of border colors based on provided keys
  const borderColors = {
    "afro-purple": "border-afro-purple",
    "afro-purple-mid": "border-afro-purple-mid",
    "afro-orange": "border-afro-orange",
    "afro-mint": "border-afro-mint",
    "afro-teal": "border-afro-teal",
    "afro-red":"border-red-600",
    "afro-gray":"border-afro-gray",
    "afro-blue":"border-blue-600",
    "afro-yellow":"border-yellow-600",
    // Add other colors as needed
  };



  return (
    <div
      className={`rounded-full w-44 h-44 border-8 ${
        borderColors[borderColor]
      } text-afro-dark font-semibold p-2 flex flex-col justify-center items-center`}
    >
      <p className="text-3xl">{children}</p>
      <p className="text-base">{info}</p>
      <p className="text-xs">{title}</p>
    </div>
  );
};

export default ProfileCircle;
