import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  post_dietary_assessment,
  get_dietary_assessment,
  delete_dietary_assessment,
  update_dietary_assessment,
  recalculate_dietary_assessment
} from '../../services/api';

// Create Assessment
export const createDietaryAssessment = createAsyncThunk(
  'assessment/create',
  async (data, { rejectWithValue }) => {
    try {
      const response = await post_dietary_assessment(data);
      return response.data;
    } catch (error) {
        console.log(error)
      return rejectWithValue(error.response?.data || 'Could not create assessment');
    }
  }
);

// Get Assessment
export const fetchDietaryAssessment = createAsyncThunk(
  'assessment/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await get_dietary_assessment();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Could not fetch assessment');
    }
  }
);

// Delete Assessment
export const deleteDietaryAssessment = createAsyncThunk(
  'assessment/delete',
  async (_, { rejectWithValue }) => {
    try {
      const response = await delete_dietary_assessment();
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || 'Could not delete assessment');
    }
  }
);

// Update Assessment
export const updateDietaryAssessment = createAsyncThunk(
    'assessment/update',
    async (data, { rejectWithValue }) => {
      try {
        const response = await update_dietary_assessment(data);
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response?.data || 'Could not update assessment');
      }
    }
  );

  // Recalculate Assessment
  export const recalculateDietaryAssessment = createAsyncThunk(
    'assessment/recalculate',
    async (_, { rejectWithValue }) => {
        try {
            const response = await recalculate_dietary_assessment();
            return response.data;
            } catch (error) {
                return rejectWithValue(error.response?.data || 'Could not recalculate assessment');
                }
                }
                );

const initialState = {
  assessment: null,
  loading: false,
  error: null,
  status: 'idle', // 'idle' | 'pending' | 'succeeded' | 'failed'
  hasRegistered: false,
  formData: null,
};

const assessmentSlice = createSlice({
  name: 'assessment',
  initialState,
  reducers: {
    clearAssessment: (state) => {
      state.assessment = null;
      state.error = null;
      state.status = 'idle';
    },
    setHasRegistered: (state, action) => {
      state.hasRegistered = action.payload;
    },
    setFormData: (state, action) => {
      state.formData = action.payload;
    },
    clearFormData: (state) => {
      state.formData = null;
      state.hasRegistered = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create Assessment
      .addCase(createDietaryAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'pending';
      })
      .addCase(createDietaryAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.assessment = action.payload;
        state.status = 'succeeded';
      })
      .addCase(createDietaryAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      // Fetch Assessment
      .addCase(fetchDietaryAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'pending';
      })
      .addCase(fetchDietaryAssessment.fulfilled, (state, action) => {
        state.loading = false;
        state.assessment = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchDietaryAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      // Delete Assessment
      .addCase(deleteDietaryAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'pending';
      })
      .addCase(deleteDietaryAssessment.fulfilled, (state) => {
        state.loading = false;
        state.assessment = null;
        state.status = 'succeeded';
      })
      .addCase(deleteDietaryAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })

      // update Assessment
      .addCase(updateDietaryAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'pending';
      })
      .addCase(updateDietaryAssessment.fulfilled, (state,action) => {
        state.loading = false;
        state.assessment = action.payload;
        state.status = 'succeeded';
      })
      .addCase(updateDietaryAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      // recalculte Assessment
      .addCase(recalculateDietaryAssessment.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'pending';
      })
      .addCase(recalculateDietaryAssessment.fulfilled, (state,action) => {
        state.loading = false;
        state.assessment = action.payload;
        state.status = 'succeeded';
      })
      .addCase(recalculateDietaryAssessment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  },
});

export const { clearAssessment, setHasRegistered, setFormData, clearFormData } = assessmentSlice.actions;
export default assessmentSlice.reducer;