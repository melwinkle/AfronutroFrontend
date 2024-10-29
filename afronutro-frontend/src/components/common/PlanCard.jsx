import React from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "./CustomButton";
import food from "../../assets/images/Food.svg";

const PlanCard = ({ description, calories, id, children }) => {
  const navigate = useNavigate();

  const handlerecipe = () => {
    navigate(`/recipes/${id}`);
  };
  return (
    <div className="border border-afro-gray-mid-light rounded space-y-12 p-2 w-64 h-48 relative">
      <div className="absolute left-2 top-0 transform  -translate-y-1/2 h-20 w-20 rounded-full  ">
        <img
          src={food}
          alt="food"
          className="w-full h-full object-cover rounded-full border"
        />
      </div>
      <div  >
        <hr className="bg-afro-brown w-4/12 h-1 "></hr>
        <h1 className="font-bold text-xl">{children}</h1>
        <p className="text-afro-gray text-sm text-wrap">{description}</p>
        <div className="flex space-x-4 justify-between items-center pt-4">
          <div className="w-3/4">
            {" "}
            <CustomButton variant="greenoutlines" length="primary" onClick={handlerecipe}>
              See recipe
            </CustomButton>
          </div>

          <div className="flex space-x-1 w-1/2 items-center">
            {/* svg */}
            <img src={food} />
            <p className="text-sm">{calories} kcal</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default PlanCard;
