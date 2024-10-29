import React from "react";
import { useNavigate } from "react-router-dom";
import ContinueButton from "../common/ContinueButton";
import confetti from "../../assets/images/Confetti.svg";
import NutritionCircle from "../common/NutritionCircle";
import Tags from "../common/Tags";
import { calculateTotalNutrients,getGoalLabelByValue,getLabelByValue } from "../../utils/helper";

const MealPlanSummary = ({ formData,mealPlanData }) => {
    const navigate=useNavigate();
    const handlemealplan=()=>{
        navigate(`/mealplan/${mealPlanData.meal_plan_id}`)
    }

    const total=calculateTotalNutrients(mealPlanData?.nutritional_composition)

  return (
    <div>
      

      <div className="flex flex-col items-center">
        <img src={confetti} className="h-12 w-12"/>
        <h3 className="font-bold text-afro-gray-dark text-4xl">
          Congratulations,{formData.personalData.name}!
        </h3>
        <p className="text-sm text-afro-gray">
        Your meal plan was generated based on your preferences and goals. This is more tailored towards being {mealPlanData.tags.dietary_preferences.join(",")} meal plan
        </p>

        <div className="grid grid-cols-3 lg:grid-cols-5 gap-4 mx-8 p-4">
          <NutritionCircle title="calories" borderColor="afro-purple">
            {total.calories}
          </NutritionCircle>
          <NutritionCircle title="protein" borderColor="afro-purple-mid">
          {total.protein}
          </NutritionCircle>
          <NutritionCircle title="carbs" borderColor="afro-orange">
          {total.carbs}
          </NutritionCircle>
          <NutritionCircle title="fats" borderColor="afro-mint">
          {total.fat}
          </NutritionCircle>
          <NutritionCircle title="fiber" borderColor="afro-mint">
          {total.fiber?total.fiber:0}
          </NutritionCircle>
        </div>
        <h3 className="font-bold text-xl">Tags</h3>
        <div className="flex md:flex-wrap lg:flex-nowrap space-x-2 p-4">
            {
              mealPlanData.tags.dietary_preferences.map((tag, index) => (
                <Tags key={index} variant="secondary">{getLabelByValue(tag)}</Tags>
                ))
            }
            {
              
              mealPlanData.tags.health_goals.map((tag, index) => (
                <Tags key={index} variant="secondary">{getGoalLabelByValue(tag)}</Tags>
                ))
            }
            
        </div>
      </div>

      <div className="flex justify-center">
        <ContinueButton nextStep={handlemealplan} agreed={true}>
          View Meal Plan
        </ContinueButton>
      </div>
    </div>
  );
};

export default MealPlanSummary;
