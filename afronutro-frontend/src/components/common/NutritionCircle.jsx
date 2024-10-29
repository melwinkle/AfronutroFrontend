import React from "react";

const NutritionCircle = ({ children, title, borderColor }) => {
  // Map of border colors based on provided keys
  const borderColors = {
    "afro-purple": "border-afro-purple",
    "afro-purple-mid": "border-afro-purple-mid",
    "afro-orange": "border-afro-orange",
    "afro-mint": "border-afro-mint",
    "afro-teal": "border-afro-teal",
    // Add other colors as needed
  };

  return (
    <div
      className={`rounded-full w-24 h-24 border-4 ${
        borderColors[borderColor]
      } text-afro-dark font-semibold p-2 flex flex-col justify-center items-center`}
    >
      <p className="text-2xl">{children}</p>
      <p className="text-xs">{title}</p>
    </div>
  );
};

export default NutritionCircle;
