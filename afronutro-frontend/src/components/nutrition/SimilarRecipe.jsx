import React, { useEffect,useRef } from "react";
import RecipeCard from "../common/RecipeCard";
import citrus from "../../assets/images/citrus.png";
import { fetchRecipes } from "../../redux/slices/recipeSlice";
import { useDispatch, useSelector } from "react-redux";


const SimilarRecipes = ({ tags = [], currentRecipeId }) => {
  const dispatch = useDispatch();
  const { recipesList } = useSelector((state) => state.recipes);
  const recipeRef=useRef(false);

  useEffect(()=>{
    if(!recipeRef.current){
      dispatch(fetchRecipes())
      recipeRef.current=true;
      }

  },[dispatch])
  // Filter locally based on tags and exclude the current recipe ID
  const similarRecipes =  recipesList
      .filter(recipe => recipe.recipe_id !== currentRecipeId)
      .filter(recipe => 
        tags.every(tag => recipe.tags && recipe.tags.includes(tag))
      )
      .slice(0, 4); 
  

  if (!similarRecipes.length) {
    return (
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Similar Recipes</h2>
        <p className="text-gray-600">No similar recipes found.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-4">Similar Recipes</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {similarRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            title={recipe.title}
            image={recipe.image || citrus}
            id={recipe.id}
          >
            {recipe.info}
          </RecipeCard>
        ))}
      </div>
    </div>
  );
};

export default SimilarRecipes;
