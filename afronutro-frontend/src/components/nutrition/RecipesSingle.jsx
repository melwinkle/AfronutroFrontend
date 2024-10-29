import React, { useState, useEffect,useMemo,useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchRecipeById,
  fetchRecipeRating,
  postRecipeRating,
} from "../../redux/slices/recipeSlice";
import { calculateAverageRating, formatRating } from "../../utils/helper.js";
import BackButton from "../common/BackButton";
import veganfood from "../../assets/images/veganfood.png";
import cook from "../../assets/images/Stir.svg";
import NutritionCircle from "../common/NutritionCircle";
import Tags from "../common/Tags";
import RecipeCard from "../common/RecipeCard";
import ReviewSection from "../common/ReviewSection.jsx";
import Favorites from "../../components/common/Favorite.jsx";
import SimilarRecipes from "./SimilarRecipe.jsx";
import Spinner from "../common/Spinner.jsx";
import Empty from "../common/Empty.jsx";

const RecipesSingle = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const recipe = useSelector((state) => state.recipes.recipeDetail);
  const ratings = useSelector((state) => state.recipes.ratings[id]) || [];
  const loading = useSelector((state) => state.recipes.loading);
  const { isAuthenticated } = useSelector((state) => state.auth);
 
  const fetchRecipeByIdRef = useRef(false);  // Ref to ensure fetchRecipeById is only called once
  const fetchRecipeRatingRef = useRef(false);  // Ref to ensure fetchRecipeRating is only called once

  // Dispatch fetchRecipeById only once per recipe
  useEffect(() => {
    if (!fetchRecipeByIdRef.current) {
      dispatch(fetchRecipeById(id));
      fetchRecipeByIdRef.current = true;
    }
  }, [dispatch, id]);

  // Dispatch fetchRecipeRating only once per recipe
  useEffect(() => {
    if (!fetchRecipeRatingRef.current) {
      dispatch(fetchRecipeRating(id));
      fetchRecipeRatingRef.current = true;
    }
  }, [dispatch, id]);

  const { averageRating, totalRatings } = calculateAverageRating(ratings);
  
 // Memoize the tags to prevent unnecessary re-renders
 const recipeTags = useMemo(() => {
  return recipe?.tags || [];
}, [recipe?.tags]);


  // Helper function to render stars
  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={`w-6 h-6 ${
              star <= rating ? "text-afro-green" : "text-afro-gray-mid"
            } dark:text-white`}
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill={star <= rating ? "currentColor" : "none"}
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeWidth={star <= rating ? "0" : "1"}
              d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"
            />
          </svg>
        ))}
      </div>
    );
  };



  if (loading) {
    return <Spinner/>;
  }

  if (!recipe) {
    return <Empty/>;
  }

  return (
    <div className="space-y-2 flex-grow pb-8">
      <div className="bg-[url('assets/images/citrus.png')] bg-cover bg-center h-96 flex flex-col items-start justify-end bg-opacity-45 p-4 bg-afro-gray-dark">
        <h1 className="font-bold text-3xl md:text-5xl text-white">
          {recipe.name}
        </h1>
        <Favorites id={id}/>
      </div>
      <div className="flex flex-col md:flex-row justify-between space-y-2 md:space-x-8 mb-4 flex-grow mx-4 mt-4">
        <div className="md:w-3/5 space-y-1">
          <BackButton />
          <div className="flex space-x-2">
            <p className="text-afro-gray-mid">Reviews</p>
            <div className="flex items-center space-x-2">
              {renderStars(averageRating)}
              <p className="text-afro-gray-dark">
                {formatRating(averageRating, totalRatings)}
              </p>
            </div>
          </div>
          <div className="p-4 bg-afro-brown/20 rounded text-afro-gray-mid">
            <p className="text-justify p-2 italic font-light">
              {recipe.recipe_info}
            </p>
          </div>
          <div className="flex space-x-2 pt-4">
            <p className="font-bold">Ingredients:</p>
            <ul className="space-y-2">
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <span className="rounded-full border-2 border-afro-brown text-afro-brown font-bold w-10 h-10 bg-transparent flex items-center justify-center text-xl">
                    {index + 1}
                  </span>
                  <span className="text-left">{ingredient}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
          <ReviewSection recipeId={id} />
          </div>
        </div>
        <div className="md:w-2/5">
          <div className="shadow bg-white flex-grow rounded relative">
            <div className="relative h-24 p-4 bg-gradient-to-r from-afro-brown to-afro-gray-mid-dark rounded-t">
              <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-1/2 h-20 w-20 rounded-full bg-afro-teal flex items-center justify-center">
                <img src={veganfood} className="w-16 h-16" alt="Food icon" />
              </div>
            </div>
            <div className="mt-10 flex items-start space-x-4 p-4">
              <div className="flex items-start justify-center w-1/2">
                <img src={cook} alt="Cooking icon" />
                <p>Cooking time: {recipe.duration} mins</p>
              </div>
              <div className="flex items-start justify-center w-1/2">
                <svg
                  className="w-6 h-6 text-afro-brown dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    d="M12 6a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm-1.5 8a4 4 0 0 0-4 4 2 2 0 0 0 2 2h7a2 2 0 0 0 2-2 4 4 0 0 0-4-4h-3Z"
                    clipRule="evenodd"
                  />
                </svg>
                <p>Cuisine: {recipe.cuisine}</p>
              </div>
            </div>
            <div>
              <h2 className="text-lg font-bold text-afro-brown text-center">
                Nutritional information
              </h2>
              <div className="grid grid-cols-3 gap-2 mx-8">
                <NutritionCircle title="Kcal" borderColor="afro-purple">
                  {recipe.nutrition.calories}
                </NutritionCircle>
                <NutritionCircle title="Fat" borderColor="afro-purple-mid">
                  {recipe.nutrition.fat}g
                </NutritionCircle>
                <NutritionCircle title="Carbs" borderColor="afro-orange">
                  {recipe.nutrition.carbs}g
                </NutritionCircle>
                <NutritionCircle title="Protein" borderColor="afro-mint">
                  {recipe.nutrition.protein}g
                </NutritionCircle>
                <NutritionCircle title="Fiber" borderColor="afro-mint">
                  {recipe.nutrition.fiber}g
                </NutritionCircle>
              </div>
            </div>
            <div className="mx-8 pb-4 mt-2">
              <h2 className="text-lg font-bold text-afro-dark text-center">
                Dietary Information
              </h2>
              <div className="flex gap-2  flex-wrap  ">
                {recipe.vegan && <Tags variant="primary">Vegan</Tags>}
                {recipe.vegetarian && <Tags variant="primary">Vegetarian</Tags>}
                {recipe.gluten_free && (
                  <Tags variant="primary">Gluten-free</Tags>
                )}
                {recipe.pescatarian && (
                  <Tags variant="primary">Pescatarian</Tags>
                )}
                {recipe.halal && <Tags variant="primary">Halal</Tags>}
              </div>
            </div>
            <div className="mx-8 pb-4">
              <h2 className="text-lg font-bold text-afro-dark text-center">
                Tags
              </h2>
              <div className="flex  flex-wrap gap-2">
                {recipe.tags.map((tag, index) => (
                  <Tags key={index} variant="primary">
                    {tag}
                  </Tags>
                ))}
              </div>
            </div>

            {/* Lock Overlay */}
            {!isAuthenticated && ( // Check if user is not authenticated
              <div className="absolute inset-0 bg-white bg-opacity-100 flex flex-col items-center justify-center rounded">
                <span className="text-xl text-afro-green">
                  Please Register/Login to view the nutritional information
                </span>
                <span className="text-white text-4xl">🔒</span>
              </div>
            )}
          </div>
         
        </div>
      </div>
      <div>
      
        {/* <SimilarRecipes 
          tags={recipeTags}
          currentRecipeId={id}
        /> */}
      
      </div>
    </div>
  );
};

export default RecipesSingle;
