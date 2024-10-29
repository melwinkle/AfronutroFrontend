import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  get_tags_type,
  get_activity_level,
  get_health_goal,
  get_dietary_preference,
  get_meal_type,
  get_dish_type,
  get_cuisine_type,
} from '../../services/api'; // Adjust the import path to your api module

// Async thunks for API calls
export const fetchTagsType = createAsyncThunk('data/fetchTagsType', async () => {
  const response = await get_tags_type();
  return response.data;
});

export const fetchActivityLevel = createAsyncThunk('data/fetchActivityLevel', async () => {
  const response = await get_activity_level();
  return response.data;
});

export const fetchHealthGoal = createAsyncThunk('data/fetchHealthGoal', async () => {
  const response = await get_health_goal();
  return response.data;
});

export const fetchDietaryPreference = createAsyncThunk('data/fetchDietaryPreference', async () => {
  const response = await get_dietary_preference();
  return response.data;
});

export const fetchMealType = createAsyncThunk('data/fetchMealType', async () => {
  const response = await get_meal_type();
  return response.data;
});

export const fetchDishType = createAsyncThunk('data/fetchDishType', async () => {
  const response = await get_dish_type();
  return response.data;
});

export const fetchCuisineType = createAsyncThunk('data/fetchCuisineType', async () => {
  const response = await get_cuisine_type();
  return response.data;
});

// Slice definition
const dataSlice = createSlice({
  name: 'data',
  initialState: {
    tags: [],
    activityLevels: [],
    healthGoals: [],
    dietaryPreferences: [],
    mealTypes: [],
    dishTypes: [],
    cuisines: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTagsType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTagsType.fulfilled, (state, action) => {
        state.loading = false;
        state.tags = action.payload;
      })
      .addCase(fetchTagsType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchActivityLevel.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchActivityLevel.fulfilled, (state, action) => {
        state.loading = false;
        state.activityLevels = action.payload;
      })
      .addCase(fetchActivityLevel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchHealthGoal.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchHealthGoal.fulfilled, (state, action) => {
        state.loading = false;
        state.healthGoals = action.payload;
      })
      .addCase(fetchHealthGoal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDietaryPreference.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDietaryPreference.fulfilled, (state, action) => {
        state.loading = false;
        state.dietaryPreferences = action.payload;
      })
      .addCase(fetchDietaryPreference.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchMealType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMealType.fulfilled, (state, action) => {
        state.loading = false;
        state.mealTypes = action.payload;
      })
      .addCase(fetchMealType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchDishType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchDishType.fulfilled, (state, action) => {
        state.loading = false;
        state.dishTypes = action.payload;
      })
      .addCase(fetchDishType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchCuisineType.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCuisineType.fulfilled, (state, action) => {
        state.loading = false;
        state.cuisines = action.payload;
      })
      .addCase(fetchCuisineType.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions and reducer
export default dataSlice.reducer;
export const {
  // Define any additional actions if needed
} = dataSlice.actions;
