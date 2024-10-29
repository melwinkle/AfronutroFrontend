import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../common/CustomButton";
import { updateDietaryAssessment } from "../../redux/slices/assessmentSlice";
import { fetchIngredients } from "../../redux/slices/recipeSlice";
import { getLabelByValue, getGoalLabelByValue } from "../../utils/helper";
import { generate_meal_plan } from "../../redux/slices/mealplansSlice";
import { useNavigate } from "react-router-dom";

const EditAssessmentModal = ({ isOpen, onClose, assessment }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for each editable field
  const [dietaryPreferences, setDietaryPreferences] = useState(
    assessment?.dietary_preferences || []
  );
  const [healthGoals, setHealthGoals] = useState(
    assessment?.health_goals || []
  );
  const [likedIngredients, setLikedIngredients] = useState(
    assessment?.liked_ingredients || []
  );
  const [dislikedIngredients, setDislikedIngredients] = useState(
    assessment?.disliked_ingredients || []
  );

  const { ingredients, ingredientsLoading, ingredientsError } = useSelector(
    (state) => state.recipes
  );

  // useRef flags for tracking fetch calls
  const ingredientsFetched = useRef(false);
  const mealPlanGenerated = useRef(false);

  // Fetch ingredients once on component mount
  useEffect(() => {
    if (!ingredientsFetched.current) {
      dispatch(fetchIngredients());
      ingredientsFetched.current = true; // Mark ingredients fetch as completed
    }
  }, [dispatch]);

  // Input states for new items
  const [newPreference, setNewPreference] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newLikedIngredient, setNewLikedIngredient] = useState("");
  const [newDislikedIngredient, setNewDislikedIngredient] = useState("");

  // Filter ingredients for suggestions
  const filterIngredients = (input, currentIngredients) => {
    if (!input) return [];
    return ingredients
      .filter(
        (ingredient) =>
          ingredient.name.toLowerCase().includes(input.toLowerCase()) &&
          !currentIngredients.includes(ingredient.name)
      )
      .slice(0, 5); // Limit to 5 suggestions
  };

  // Submit dietary assessment and generate meal plan
  const handleSubmit = async () => {
    const updatedData = {
      dietary_preferences: dietaryPreferences,
      health_goals: healthGoals,
      liked_ingredients: likedIngredients,
      disliked_ingredients: dislikedIngredients,
    };

    try {
      // First update the dietary assessment
      await dispatch(updateDietaryAssessment(updatedData)).unwrap();
      
      // Generate meal plan only if not generated already
      if (!mealPlanGenerated.current) {
        const result = await dispatch(generate_meal_plan()).unwrap();
        mealPlanGenerated.current = true; // Mark meal plan generation as completed
        onClose(); // Close the modal
        navigate(`/mealplan/${result.meal_plan_id}/`);
      }
    } catch (error) {
      console.error("Failed to update preferences and generate meal plan:", error);
    }
  };

  // Exit if modal is not open
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4">Edit Dietary Preferences</h2>

        {/* Dietary Preferences Section */}
        <div className="mb-4 space-y-1">
          <label className="block text-sm font-medium mb-2">
            Dietary Preferences
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {dietaryPreferences.map((pref, index) => (
              <span key={index} className="bg-afro-purple/20 text-afro-purple px-3 py-1 rounded-full flex items-center gap-1">
                {getLabelByValue(pref)}
                <a onClick={() => removeTag(dietaryPreferences, setDietaryPreferences, index)}>
                  <svg className="w-6 h-6 text-gray-800 cursor-pointer" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z" />
                  </svg>
                </a>
              </span>
            ))}
          </div>
          {/* Preference Selector */}
          <select className="w-full border rounded-md p-2" value={newPreference} onChange={(e) => setNewPreference(e.target.value)}>
            <option value="">Select preference...</option>
            {preferenceOptions.map((option) => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
          <div className="flex justify-end">
            <CustomButton variant="orangeoutline" length="secondary" onClick={() => addTag(newPreference, dietaryPreferences, setDietaryPreferences, setNewPreference)}>Add Preference</CustomButton>
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex justify-end space-x-2">
          <CustomButton variant="orangeoutline" length="cta" onClick={onClose}>Cancel</CustomButton>
          <CustomButton variant="secondary" length="cta" onClick={handleSubmit}>Save Changes</CustomButton>
        </div>
      </div>
    </div>
  );
};

export default EditAssessmentModal;
