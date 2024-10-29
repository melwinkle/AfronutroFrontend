import React, { useState,useEffect } from "react";
import Tags from "../common/Tags"; // Adjust the import path based on your file structure
import ContinueButton from "../common/ContinueButton";
import { useDispatch,useSelector } from "react-redux";
import { fetchIngredients } from "../../redux/slices/recipeSlice";

const LikedIngredients = ({ nextStep, prevStep, updateFormData ,data}) => {
    const dispatch = useDispatch();
  const { ingredients, ingredientsLoading, ingredientsError } = useSelector(
    (state) => state.recipes
  );
  // Fetch ingredients on component mount
  useEffect(() => {
    dispatch(fetchIngredients());
  }, [dispatch]);

  


  const [selectedIngredients, setSelectedIngredients] = useState(() => {
    // Ensure we're working with an array
    return Array.isArray(data) ? data : [];
  })
  const [searchTerm, setSearchTerm] = useState("");

  // Toggle ingredient selection
  const toggleIngredient = (ingredient) => {
    if (selectedIngredients.includes(ingredient)) {
      setSelectedIngredients(selectedIngredients.filter((i) => i !== ingredient));
    } else {
      setSelectedIngredients([...selectedIngredients, ingredient]);
    }
  };

   // Optional: Update selectedLevel if data changes
   useEffect(() => {
    if (data && Array.isArray(data)) {
      setSelectedIngredients(data);
    }
  }, [data]);
  // Filter ingredients based on search term
  const filteredIngredients = ingredients.filter((ingredient) =>
    ingredient.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNext = () => {
    updateFormData({ liked_ingredients: selectedIngredients });
    nextStep();
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-1 text-center">Select Liked Ingredients</h2>
      <p className="text-center text-afro-gray-mid mb-4">
        You can choose ingredients you like or proceed without any selection.
      </p>

      {/* Search input */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border border-gray-300 p-2 rounded w-full"
        />
      </div>

      {/* Tags display */}
      {/* Loading and error handling */}
      {ingredientsLoading ? (
        <div className="text-center py-4">
          <p>Loading ingredients...</p>
        </div>
      ) : ingredientsError ? (
        <div className="text-center py-4 text-red-500">
          <p>{ingredientsError}</p>
        </div>
      ) : (
        /* Tags display */
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4 py-8">
          {filteredIngredients.map((ingredient, index) => (
            <div key={index} onClick={() => toggleIngredient(ingredient.name)}>
              <Tags variant={selectedIngredients.includes(ingredient.name) ? "select" : "secondary"}>
                {ingredient.name}
              </Tags>
            </div>
          ))}
        </div>
      )}

      {/* Navigation buttons */}
      <div className="flex justify-between space-x-4">
        <button
          onClick={prevStep}
          className="border border-afro-brown text-afro-brown py-4 px-4 rounded bg-transparent w-1/2"
        >
          Previous
        </button>

        {/* Next button is always enabled */}
        <ContinueButton nextStep={handleNext} agreed={true}>
          Next
        </ContinueButton>
      </div>
    </div>
  );
};

export default LikedIngredients;
