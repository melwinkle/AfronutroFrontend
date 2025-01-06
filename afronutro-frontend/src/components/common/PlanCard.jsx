import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import food from "../../assets/images/Food.svg";

const PlanCard = ({ description, calories, id, children, final_score }) => {
  const navigate = useNavigate();

  const handlerecipe = () => {
    navigate(`/recipes/${id}`);
  };

  return (
    <div className="border border-afro-gray-mid-light rounded p-2 w-64 h-48 relative flex flex-col">
      
      <div className="flex">
      <div className="absolute left-2 top-0 transform -translate-y-1/2 h-20 w-20 rounded-full">
        <img
          src={food}
          alt="food"
          className="w-full h-full object-cover rounded-full border"
        />
      </div>
      {/* put final socre on teh top right of teh card */}
      <div className="absolute right-2 top-4 ">
        <p className="text-afro-green font-bold text-sm mt-1">{(final_score*100).toFixed(2)}% confidence </p>
      </div>

      </div>
      <div className="flex flex-col h-full pt-10">
        <hr className="bg-afro-brown w-4/12 h-1 mb-2" />
        <div className="flex-grow overflow-hidden">
          <h1 className="font-bold text-xl line-clamp-1 mb-1">{children}</h1>
          <p className="text-afro-gray text-sm line-clamp-2">{description}</p>
        </div>
        <div className="flex space-x-4 justify-between items-center mt-auto">
          <div className="w-3/4">
            <CustomButton 
              variant="greenoutlines" 
              length="primary" 
              onClick={handlerecipe}
            >
              See recipe
            </CustomButton>
          </div>
          <div className="flex space-x-1 w-1/2 items-center">
            <img src={food} alt="food icon" />
            <p className="text-sm">{calories} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanCard;