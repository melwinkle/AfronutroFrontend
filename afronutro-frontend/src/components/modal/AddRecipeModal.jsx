import React, { useEffect, useState, useMemo } from "react";
import { Modal, ModalHeader, ModalBody } from "flowbite-react";
import { useDispatch, useSelector } from "react-redux";
import { fetchRecipes } from "../../redux/slices/recipeSlice";
import ContinueButton from "../common/ContinueButton";

const AddRecipeModal = ({ showModal, onClose, mealType, onAdd, tags, meals }) => {
  const dispatch = useDispatch();
  const [selectedRecipes, setSelectedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { recipesList, loading, error } = useSelector((state) => state.recipes);

  // State to handle suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  

  useEffect(() => {
    if (showModal) {
      dispatch(fetchRecipes());

      // Initialize selected recipes with existing recipes for the current meal type
      if (meals && meals[mealType]) {
        setSelectedRecipes(meals[mealType].map(recipe => recipe)); // Assuming recipe has a 'name' property
      }
    }
  }, [showModal, dispatch, mealType, meals]);

  const handleAddRecipes = () => {
    try {
      if (!meals) {
        console.error("Meals structure is undefined");
        return;
      }

      const existingMealsStructure = meals || {
        breakfast: [],
        lunch: [],
        dinner: [],
        snack: [],
      };

      // Merge the selected recipes into the existing meals structure
      const updatedMealsStructure = {
        ...existingMealsStructure,
        [mealType]: [
          ...selectedRecipes.map(recipe => ({
            name: recipe.name,
            recipe_id: recipe.recipe_id,
            calories: recipe.calories,
            fat: recipe.fat,
            protein: recipe.protein,
            carbs: recipe.carbs,
            final_score: 1
          }))
        ]
      };

      // Call the onAdd callback with the updated meals_structure
      onAdd(updatedMealsStructure);
      onClose();
    } catch (err) {
      console.error("Failed to add recipes:", err);
    }
  };

  const handleRecipeSelect = (recipe) => {
    // Extract necessary properties and set final_score to 1
    const selectedRecipe = {
      recipe_id: recipe.recipe_id,
      name: recipe.name,
      calories: recipe.nutrition.calories,
      fat: recipe.nutrition.fat,
      protein: recipe.nutrition.protein,
      carbs: recipe.nutrition.carbs,
      final_score: 1
    };
  
    // Prevent adding duplicate recipes
    if (!selectedRecipes.some(selected => selected.recipe_id === selectedRecipe.recipe_id)) {
      setSelectedRecipes([...selectedRecipes, selectedRecipe]);
    }
    setSearchTerm("");
    setShowSuggestions(false);
  };

  const handleRemoveRecipe = (recipeId) => {
    setSelectedRecipes(selectedRecipes.filter(id => id !== recipeId));
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
    setShowSuggestions(searchTerm !== "");
  };

  console.log(selectedRecipes);

  const filteredRecipes = useMemo(() => {
    return recipesList
      ?.filter((recipe) => recipe.meal_type.includes(mealType))
      .filter((recipe) => {
        if (!tags?.dietary_preferences || tags?.dietary_preferences.length === 0) {
          return true;
        }
        return tags.dietary_preferences.every((tag) => {
          switch (tag) {
            case 'GLU':
              return recipe.gluten_free;
            case 'VEG':
              return recipe.vegan;
            case 'VGT':
              return recipe.vegetarian;
            case 'HAL':
              return recipe.halal;
            case 'PES':
              return recipe.pescatarian;
            default:
              return true;
          }
        });
      })
      .filter((recipe) => recipe.name.toLowerCase().includes(searchTerm));
  }, [recipesList, mealType, tags, searchTerm]);

  const recipeSuggestions = useMemo(() => {
    return filteredRecipes.slice(0, 5);
  }, [filteredRecipes]);

  return (
    <Modal show={showModal} onClose={onClose}>
      <ModalHeader>Add Recipes</ModalHeader>
      <ModalBody>
        {loading && <div>Loading recipes...</div>}
        {error && <div className="text-red-500">{error}</div>}

        {/* Selected Recipes Tags */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Selected Recipes</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {selectedRecipes.map((recipeName) => {
              const recipe = recipesList.find(r => r.name === recipeName.name);
              return (
                <span
                  key={recipeName}
                  className="bg-green-100 text-green-800 px-3 py-1 rounded-full flex items-center gap-1"
                >
                  {recipe?.name}
                  <a onClick={() => handleRemoveRecipe(recipeName)}>
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
              );
            })}
          </div>
        </div>

        {/* Input for searching recipes */}
        <div className="relative mb-4">
          <label className="block text-sm font-medium mb-2">Search Recipes</label>
          <input
            type="text"
            className="w-full border rounded-md p-2"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search recipes..."
          />
          {/* Suggestions dropdown */}
          {showSuggestions && recipeSuggestions?.length > 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg">
              {recipeSuggestions.map((recipe) => (
                <div
                  key={recipe.id}
                  className="p-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => handleRecipeSelect(recipe)} // Add only the recipe name
                >
                  {recipe.name}
                </div>
              ))}
            </div>
          )}
          {showSuggestions && recipeSuggestions.length === 0 && (
            <div className="absolute z-10 w-full bg-white border rounded-md shadow-lg p-2">
              No results found
            </div>
          )}
        </div>

        <ContinueButton nextStep={handleAddRecipes} agreed={selectedRecipes.length > 0}>
          Add Selected Recipes
        </ContinueButton>
      </ModalBody>
    </Modal>
  );
};

export default AddRecipeModal;
