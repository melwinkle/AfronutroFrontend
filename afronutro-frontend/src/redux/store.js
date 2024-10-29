import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import recipeReducer from './slices/recipeSlice';
import assessmentReducer from "./slices/assessmentSlice";
import mealplansReducer from "./slices/mealplansSlice";
import dataReducer from "./slices/dataSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    content: contentReducer,
    recipes: recipeReducer,
    assessment: assessmentReducer,
    mealplans: mealplansReducer,
    data:dataReducer
  },
});

export default store;
