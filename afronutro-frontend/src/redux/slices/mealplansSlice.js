import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  generate_meal_plans,
  get_meal_plans,
  save_meal_plans,
  delete_meal_plans,
  get_all_meal_plans,
  customize_meal_plans,
} from "../../services/api";


export const get_meal_plan = createAsyncThunk(
  "mealplans/get_meal_plans",
  async (data, { rejectWithValue }) => {
    try {
      const response = await get_meal_plans(data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const get_all_meal_plan = createAsyncThunk(
  "mealplans/get_all_meal_plans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_all_meal_plans();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const generate_meal_plan = createAsyncThunk(
  "mealplans/generate_meal_plans",
  async (_, { rejectWithValue }) => {
    try {
      const response = await generate_meal_plans();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const save_meal_plan = createAsyncThunk(
  "mealplans/save_meal_plans",
  async (id, { rejectWithValue }) => {
    try {
      const response = await save_meal_plans(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const delete_meal_plan = createAsyncThunk(
  "mealplans/delete_meal_plans",
  async (id, { rejectWithValue }) => {
    try {
      const response = await delete_meal_plans(id);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const customize_meal_plan = createAsyncThunk(
  "mealplans/customize_meal_plans",
  async ({id,data}, { rejectWithValue }) => {
    try {
      const response = await customize_meal_plans(id,data);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  meal_plans: [],
  selectedmeal_plan:null,
  loading: false,
  error: null,
  message: null,
  status: "idle",
};

export const mealplansSlice = createSlice({
  name: "mealplans",
  initialState,
  reducers: {
    clearMealPlans: (state) => {
      state.status = "idle";
      state.meal_plans = [];
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(get_meal_plan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedmeal_plan = action.payload;
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(get_meal_plan.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
        state.message = null;
      })
      .addCase(get_meal_plan.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(generate_meal_plan.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(generate_meal_plan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(generate_meal_plan.rejected, (state, action) => {
        state.status = "failed";
        state.loading = false;
        state.error = action.error.message;
        state.message = null;
      })
      .addCase(customize_meal_plan.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(customize_meal_plan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meal_plans = action.payload;
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(customize_meal_plan.rejected, (state, action) => {
        state.status = "failed";
        state.meal_plans = [];
        state.loading = false;
        state.error = action.error.message;
        state.message = null;
      })
      .addCase(delete_meal_plan.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(delete_meal_plan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meal_plans = null;
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(delete_meal_plan.rejected, (state, action) => {
        state.status = "failed";
        state.meal_plans = [];
        state.loading = false;
        state.error = action.error.message;
        state.message = null;
      })
      .addCase(get_all_meal_plan.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(get_all_meal_plan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meal_plans = action.payload;
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(get_all_meal_plan.rejected, (state, action) => {
        state.status = "failed";
        state.meal_plans = [];
        state.loading = false;
        state.error = action.error.message;
        state.message = null;
      })
      .addCase(save_meal_plan.pending, (state, action) => {
        state.status = "loading";
        state.loading = true;
        state.error = null;
        state.message = null;
      })
      .addCase(save_meal_plan.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.meal_plans = action.payload;
        state.loading = false;
        state.error = null;
        state.message = null;
      })
      .addCase(save_meal_plan.rejected, (state, action) => {
        state.status = "failed";
        state.meal_plans = [];
        state.loading = false;
        state.error = action.error.message;
        state.message = null;
      });
  },
});

export default mealplansSlice.reducer;

