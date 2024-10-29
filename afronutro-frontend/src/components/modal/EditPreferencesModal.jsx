import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import CustomButton from "../common/CustomButton";
import { updateDietaryAssessment } from "../../redux/slices/assessmentSlice";
import { fetchIngredients } from "../../redux/slices/recipeSlice";
import { getLabelByValue,getGoalLabelByValue } from "../../utils/helper";

const EditPreferencesModal = ({ isOpen, onClose, assessment }) => {
  const dispatch = useDispatch();
  const fetchIngredientsRef=useRef(false)

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
  // Fetch ingredients on component mount
  useEffect(() => {
    if (!ingredientsLoading && !ingredientsError && !fetchIngredientsRef.current) {
      dispatch(fetchIngredients());
      fetchIngredientsRef.current = true;
      }
  }, [dispatch]);

  // Input states for new items
  const [newPreference, setNewPreference] = useState("");
  const [newGoal, setNewGoal] = useState("");
  const [newLikedIngredient, setNewLikedIngredient] = useState("");
  const [newDislikedIngredient, setNewDislikedIngredient] = useState("");
  // In the component, add these states for handling suggestions
  const [likedSuggestions, setLikedSuggestions] = useState([]);
  const [dislikedSuggestions, setDislikedSuggestions] = useState([]);
  const [showLikedSuggestions, setShowLikedSuggestions] = useState(false);
  const [showDislikedSuggestions, setShowDislikedSuggestions] = useState(false);

  // Add refs for handling clicks outside suggestion boxes
  const likedInputRef = useRef(null);
  const dislikedInputRef = useRef(null);

  // Add click outside handler
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        likedInputRef.current &&
        !likedInputRef.current.contains(event.target)
      ) {
        setShowLikedSuggestions(false);
      }
      if (
        dislikedInputRef.current &&
        !dislikedInputRef.current.contains(event.target)
      ) {
        setShowDislikedSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Add function to filter suggestions
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

  // Modify the input handlers
  const handleLikedIngredientChange = (e) => {
    const value = e.target.value;
    setNewLikedIngredient(value);
    setLikedSuggestions(filterIngredients(value, likedIngredients));
    setShowLikedSuggestions(true);
  };

  const handleDislikedIngredientChange = (e) => {
    const value = e.target.value;
    setNewDislikedIngredient(value);
    setDislikedSuggestions(filterIngredients(value, dislikedIngredients));
    setShowDislikedSuggestions(true);
  };

  // Add handlers for selecting suggestions
  const handleSelectLikedIngredient = (ingredient) => {
    addTag(
      ingredient,
      likedIngredients,
      setLikedIngredients,
      setNewLikedIngredient
    );
    setShowLikedSuggestions(false);
  };

  const handleSelectDislikedIngredient = (ingredient) => {
    addTag(
      ingredient,
      dislikedIngredients,
      setDislikedIngredients,
      setNewDislikedIngredient
    );
    setShowDislikedSuggestions(false);
  };

  // Options for dropdowns

  const preferenceOptions = [
    { value: "GLU", label: "Gluten-Free" },
    { value: "VGT", label: "Vegetarian" },
    { value: "VEG", label: "Vegan" },
    { value: "DAI", label: "Dairy-Free" },
    { value: "NUT", label: "Nut-Free" },
    { value: "KET", label: "Keto" },
    { value: "PAL", label: "Paleo" },
    { value: "LAC", label: "Lactose-Free" },
    { value: "SHE", label: "Shellfish-Free" },
    { value: "EGG", label: "Egg-Free" },
    { value: "SOY", label: "Soy-Free" },
    { value: "PEA", label: "Peanut-Free" },
    { value: "KOS", label: "Kosher" },
    { value: "HAL", label: "Halal" },
    { value: "LSU", label: "Low Sugar" },
    { value: "DIA", label: "Diabetic" },
    { value: "SPI", label: "Spicy Food" },
    { value: "SWE", label: "Sweet Food" },
    { value: "SAV", label: "Savory Food" },
    { value: "ORG", label: "Organic" },
    { value: "HPR", label: "High Protein" },
    { value: "LCA", label: "Low Carb" },
    { value: "HFI", label: "High Fiber" },
  ];
  const goalOptions = [
    { value: "LOS", label: "Lose Weight " },
    { value: "MAI", label: "Maintain Weight" },
    { value: "GAI", label: "Gain Weight " },
    { value: "FIT", label: "Improve Fitness" },
    { value: "MUS", label: "Increase Muscle" },
  ];

  const handleSubmit = () => {
    const updatedData = {
      dietary_preferences: dietaryPreferences,
      health_goals: healthGoals,
      liked_ingredients: likedIngredients,
      disliked_ingredients: dislikedIngredients,
    };

    dispatch(updateDietaryAssessment(updatedData))
      .unwrap()
      .then(() => {
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update preferences:", error);
      });
  };

  const removeTag = (array, setArray, index) => {
    setArray(array.filter((_, i) => i !== index));
  };

  const addTag = (value, array, setArray, setValue) => {
    if (value && !array.includes(value)) {
      setArray([...array, value]);
      setValue("");
    }
  };

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
              <span
                key={index}
                className="bg-afro-purple/20 text-afro-purple px-3 py-1 rounded-full flex items-center gap-1"
              >
                {getLabelByValue(pref)}

                <a
                  onClick={() =>
                    removeTag(dietaryPreferences, setDietaryPreferences, index)
                  }
                >
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </span>
            ))}
          </div>
          <select
            className="w-full border rounded-md p-2"
            value={newPreference}
            onChange={(e) => setNewPreference(e.target.value)}
          >
            <option value="">Select preference...</option>
            {preferenceOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
          <CustomButton
            variant="orangeoutline"
            length="secondary"
            onClick={() =>
              addTag(
                newPreference,
                dietaryPreferences,
                setDietaryPreferences,
                setNewPreference
              )
            }
          >
            Add Preference
          </CustomButton>

          </div>
          
        </div>

        {/* Health Goals Section */}
        <div className="mb-4 space-y-1">
          <label className="block text-sm font-medium mb-2">Health Goals</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {healthGoals.map((goal, index) => (
              <span
                key={index}
                className="bg-afro-pink/20 text-afro-pink px-3 py-1 rounded-full flex items-center gap-1"
              >
                {getGoalLabelByValue(goal)}

                <a
                  onClick={() => removeTag(healthGoals, setHealthGoals, index)}
                >
                  <svg
                    class="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                </a>
              </span>
            ))}
          </div>
          <select
            className="w-full border rounded-md p-2"
            value={newGoal}
            onChange={(e) => setNewGoal(e.target.value)}
          >
            <option value="">Select goal...</option>
            {goalOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <div className="flex justify-end">
          <CustomButton
            variant="orangeoutline"
            length="secondary"
            onClick={() =>
              addTag(newGoal, healthGoals, setHealthGoals, setNewGoal)
            }
          >
            Add Goal
          </CustomButton>

          </div>
          
        </div>

        {/* Liked Ingredients Section */}

        <div className="mb-4" ref={likedInputRef}>
          <label className="block text-sm font-medium mb-2">
            Liked Ingredients
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {likedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {ingredient}
                <a
                  onClick={() =>
                    removeTag(likedIngredients, setLikedIngredients, index)
                  }
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={newLikedIngredient}
              onChange={handleLikedIngredientChange}
              placeholder="Search liked ingredients..."
            />
            {showLikedSuggestions && likedSuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg">
                {likedSuggestions.map((ingredient, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => handleSelectLikedIngredient(ingredient.name)}
                  >
                    {ingredient.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Disliked */}
        <div className="mb-4" ref={dislikedInputRef}>
          <label className="block text-sm font-medium mb-2">
            Disliked Ingredients
          </label>
          <div className="flex flex-wrap gap-2 mb-2">
            {dislikedIngredients.map((ingredient, index) => (
              <span
                key={index}
                className="bg-red-100 text-red-800 px-3 py-1 rounded-full flex items-center gap-1"
              >
                {ingredient}
                <a
                  onClick={() =>
                    removeTag(
                      dislikedIngredients,
                      setDislikedIngredients,
                      index
                    )
                  }
                >
                  <svg
                    className="w-6 h-6 text-gray-800 dark:text-white cursor-pointer"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10S2 17.523 2 12Zm7.707-3.707a1 1 0 0 0-1.414 1.414L10.586 12l-2.293 2.293a1 1 0 1 0 1.414 1.414L12 13.414l2.293 2.293a1 1 0 0 0 1.414-1.414L13.414 12l2.293-2.293a1 1 0 0 0-1.414-1.414L12 10.586 9.707 8.293Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </span>
            ))}
          </div>
          <div className="relative">
            <input
              type="text"
              className="w-full border rounded-md p-2"
              value={newDislikedIngredient}
              onChange={handleDislikedIngredientChange}
              placeholder="Search disliked ingredients..."
            />
            {showDislikedSuggestions && dislikedSuggestions.length > 0 && (
              <div className="absolute z-10 w-full bg-white border rounded-md mt-1 shadow-lg">
                {dislikedSuggestions.map((ingredient, index) => (
                  <div
                    key={index}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() =>
                      handleSelectDislikedIngredient(ingredient.name)
                    }
                  >
                    {ingredient.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <CustomButton variant="orangeoutline" length="cta" onClick={onClose}>
            Cancel
          </CustomButton>
          <CustomButton
            variant="secondary"
            length="cta"
            onClick={handleSubmit}
          >
            Save Changes
          </CustomButton>
        </div>
      </div>
    </div>
  );
};

export default EditPreferencesModal;
