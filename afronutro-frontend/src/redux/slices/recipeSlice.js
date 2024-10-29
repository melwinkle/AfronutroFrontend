import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  get_recipes,
  get_recipe_id,
  get_recipes_filter,
  get_recipes_search,
  get_recipes_filter_meal_type,
  get_recipe_nutrition,
  get_ingredients,
  post_rating,
  get_rating,
  add_favorite,
  remove_favorite,
  get_favorites,
  get_ratings
} from "../../services/api"; // import your API functions

// Thunks for async actions
export const fetchRecipes = createAsyncThunk(
  "recipes/fetchRecipes",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_recipes(); // Call the API function
      return response.data; // Assuming `data` is the array of recipes
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchRecipeById = createAsyncThunk(
  "recipes/fetchRecipeById",
  async (id) => {
    const response = await get_recipe_id(id);
    return response.data;
  }
);

export const fetchFilteredRecipes = createAsyncThunk(
  "recipes/fetchFilteredRecipes",
  async (params) => {
    const response = await get_recipes_filter(params);
    return response.data;
  }
);

export const searchRecipes = createAsyncThunk(
  "recipes/searchRecipes",
  async (query) => {
    const response = await get_recipes_search(query);
    return response.data;
  }
);

export const fetchRecipesByMealType = createAsyncThunk(
  "recipes/fetchRecipesByMealType",
  async (meal_type) => {
    const response = await get_recipes_filter_meal_type(meal_type);
    return response.data;
  }
);

// get nutritional infro of recipe
export const fetchNutritionalInfo = createAsyncThunk(
  "recipes/fetchNutritionalInfo",
  async (recipeId) => {
    const response = await get_recipe_nutrition(recipeId);
    return response.data;
  }
);

// New thunk for fetching ingredients
export const fetchIngredients = createAsyncThunk(
  "recipes/fetchIngredients",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_ingredients();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// New thunks for ratings and favorites
export const postRecipeRating = createAsyncThunk(
    'recipes/postRating',
    async ({ id, data }, { rejectWithValue }) => {
      try {
        const response = await post_rating(id, data);
        return { id, ...response.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchRecipeRating = createAsyncThunk(
    'recipes/fetchRating',
    async (id, { rejectWithValue }) => {
      try {
        const response = await get_rating(id);
        return { id, ratings:response.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );

  // fethc all ratinfs
  export const fetchAllRatings = createAsyncThunk(
    'recipes/fetchAllRatings',
    async (recipesId, { rejectWithValue }) => {
      try {
        const response = await get_ratings(recipesId);
        return response.data;
        } catch (error) {
          return rejectWithValue(error.response.data);
          }
          }
          );
  
  export const addToFavorites = createAsyncThunk(
    'recipes/addToFavorites',
    async (id, { rejectWithValue }) => {
      try {
        const response = await add_favorite(id);
        return { id, ...response.data };
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const removeFromFavorites = createAsyncThunk(
    'recipes/removeFromFavorites',
    async (id, { rejectWithValue }) => {
      try {
        await remove_favorite(id);
        return id;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );
  
  export const fetchFavorites = createAsyncThunk(
    'recipes/fetchFavorites',
    async (_, { rejectWithValue }) => {
      try {
        const response = await get_favorites();
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
  );


// Updated initial state with ingredients
const initialState = {
  recipesList: [],
  recipeDetail: null,
  filteredRecipes: [],
  searchResults: [],
  ingredients: [],
  favorites: [],
  ratings: {},
  reciperatings:{},
  loading: false,
  error: null,
  ingredientsLoading: false,
  ingredientsError: null,
  favoritesLoading: false,
  favoritesError: null,
  ratingLoading: false,
  ratingError: null
};
// Create slice
const recipeSlice = createSlice({
  name: "recipes",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Fetch all recipes
    builder.addCase(fetchRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.recipesList = action.payload;
      state.error = null;
    });
    builder.addCase(fetchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch recipe by ID
    builder.addCase(fetchRecipeById.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipeById.fulfilled, (state, action) => {
        state.loading = false;
        state.recipeDetail = action.payload;
        // Add or update the recipe in recipesList
        const existingIndex = state.recipesList.findIndex(
          recipe => recipe.id === action.payload.id
        );
        if (existingIndex !== -1) {
          state.recipesList[existingIndex] = action.payload;
        } else {
          state.recipesList.push(action.payload);
        }
    });
    builder.addCase(fetchRecipeById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch filtered recipes
    builder.addCase(fetchFilteredRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchFilteredRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredRecipes = action.payload;
    });
    builder.addCase(fetchFilteredRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Search recipes
    builder.addCase(searchRecipes.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchRecipes.fulfilled, (state, action) => {
      state.loading = false;
      state.searchResults = action.payload;
    });
    builder.addCase(searchRecipes.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Fetch recipes by meal type
    builder.addCase(fetchRecipesByMealType.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchRecipesByMealType.fulfilled, (state, action) => {
      state.loading = false;
      state.filteredRecipes = action.payload; // Assuming this stores the filtered list
    });
    builder.addCase(fetchRecipesByMealType.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Handle ingredients fetch states
    builder.addCase(fetchIngredients.pending, (state) => {
      state.ingredientsLoading = true;
      state.ingredientsError = null;
    });
    builder.addCase(fetchIngredients.fulfilled, (state, action) => {
      state.ingredientsLoading = false;
      state.ingredients = action.payload;
      state.ingredientsError = null;
    });
    builder.addCase(fetchIngredients.rejected, (state, action) => {
      state.ingredientsLoading = false;
      state.ingredientsError = action.error.message;
    });

    // Handle rating post
    builder.addCase(postRecipeRating.pending, (state) => {
        state.ratingLoading = true;
        state.ratingError = null;
      });
      builder.addCase(postRecipeRating.fulfilled, (state, action) => {
        state.ratingLoading = false;
        state.ratings[action.payload.id] = action.payload;
      });
      builder.addCase(postRecipeRating.rejected, (state, action) => {
        state.ratingLoading = false;
        state.ratingError = action.payload;
      });
  
      // Handle rating fetch
      builder.addCase(fetchRecipeRating.fulfilled, (state, action) => {
        state.ratings[action.payload.id] = action.payload.ratings; 
      });

      // Handle ratings fetch
      builder.addCase(fetchAllRatings.fulfilled, (state, action) => {
        state.reciperatings = action.payload;
        });


  
      // Handle favorites
      builder.addCase(fetchFavorites.pending, (state) => {
        state.favoritesLoading = true;
        state.favoritesError = null;
      });
      builder.addCase(fetchFavorites.fulfilled, (state, action) => {
        state.favoritesLoading = false;
        state.favorites = action.payload;
      });
      builder.addCase(fetchFavorites.rejected, (state, action) => {
        state.favoritesLoading = false;
        state.favoritesError = action.payload;
      });
  
      builder.addCase(addToFavorites.fulfilled, (state, action) => {
        state.favorites.push(action.payload);
      });
  
      builder.addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.favorites = state.favorites.filter(recipe => recipe.id !== action.payload);
      });
  },
});

// Export the reducer
export default recipeSlice.reducer;
