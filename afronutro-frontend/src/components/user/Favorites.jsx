import React, { useEffect, useState, useRef } from "react";
import RecipeCard from "../common/RecipeCard";
import citrus from "../../assets/images/citrus.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchFavorites, fetchRecipeById } from "../../redux/slices/recipeSlice";

const Favorites = () => {
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.recipes.favorites);
  const loading = useSelector((state) => state.recipes.loading);

  const [loadedRecipes, setLoadedRecipes] = useState([]);
  const loadedRecipeIds = useRef(new Set()); // Tracks loaded recipe IDs
  const favoritesFetched = useRef(false); // Tracks if favorites have been fetched

  // Fetch the favorites list only once
  useEffect(() => {
    if (!favoritesFetched.current) {
      dispatch(fetchFavorites());
      favoritesFetched.current = true;
    }
  }, [dispatch]);

  // Fetch recipe details for each favorite recipe only once
  useEffect(() => {
    const fetchRecipeDetails = async () => {
      const recipesToLoad = favorites
        .filter((favorite) => !loadedRecipeIds.current.has(favorite.recipe))
        .map((favorite) => favorite.recipe);

      if (recipesToLoad.length > 0) {
        try {
          await Promise.all(
            recipesToLoad.map(async (recipeId) => {
              const recipe = await dispatch(fetchRecipeById(recipeId)).unwrap();
              setLoadedRecipes((prev) => [...prev, recipe]);
              loadedRecipeIds.current.add(recipeId);
            })
          );
        } catch (error) {
          console.error("Error fetching favorite recipes:", error);
        }
      }
    };

    if (favorites.length > 0) {
      fetchRecipeDetails();
    }
  }, [dispatch, favorites]);

  if (loading && !loadedRecipes.length) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((placeholder) => (
          <div key={placeholder} className="border rounded-lg p-4 animate-pulse">
            <div className="w-full h-48 bg-gray-200 rounded-md"></div>
            <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!favorites.length) {
    return (
      <div className="text-center py-8">
        <h2 className="text-xl font-semibold text-gray-700">No favorites yet</h2>
        <p className="text-gray-600 mt-2">Start adding recipes to your favorites!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
      {favorites.map((favorite) => {
        const recipeDetails = loadedRecipes.find(
          (recipe) => recipe.recipe_id === favorite.recipe
        );

        if (!recipeDetails) {
          return (
            <div key={favorite.favorite_id} className="border rounded-lg p-4 animate-pulse">
              <div className="w-full h-48 bg-gray-200 rounded-md"></div>
              <div className="h-4 bg-gray-200 rounded mt-4 w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded mt-2 w-1/2"></div>
            </div>
          );
        }

        return (
          <RecipeCard
            key={favorite.favorite_id}
            title={recipeDetails.name}
            img={recipeDetails.image || citrus}
            id={favorite.recipe}
            calories={recipeDetails.nutrition.calories}
            time={25} // Assuming a static time or update to use dynamic value if available
          >
            {recipeDetails.recipe_info}
          </RecipeCard>
        );
      })}
    </div>
  );
};

export default Favorites;
