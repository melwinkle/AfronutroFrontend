import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { 
  get_educational_content, 
  get_educational_content_id, 
  get_educational_content_filter 
} from '../../services/api.js';

// Async Thunks
export const fetchEducationalContent = createAsyncThunk(
  'content/fetchEducationalContent',
  async (_, thunkAPI) => {
    try {
      const response = await get_educational_content();
      // Add recommendation_score for sorting if not present in API response
      const contentWithScores = response.data.map(item => ({
        ...item,
        recommendation_score: item.recommendation_score || Math.random() // fallback if not provided
      }));
      return contentWithScores;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchEducationalContentById = createAsyncThunk(
  'content/fetchEducationalContentById',
  async (id, thunkAPI) => {
    try {
      const response = await get_educational_content_id(id);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

export const fetchFilteredEducationalContent = createAsyncThunk(
  'content/fetchFilteredEducationalContent',
  async (type, thunkAPI) => {
    try {
      const response = await get_educational_content_filter(type);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  contentList: [],
  contentDetail: null,
  filteredContent: [],
  loading: false,
  error: null,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    sortContentByDate: (state) => {
      state.contentList.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
    },
    sortContentByRecommendation: (state) => {
      state.contentList.sort((a, b) => b.recommendation_score - a.recommendation_score);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationalContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationalContent.fulfilled, (state, action) => {
        state.loading = false;
        state.contentList = action.payload;
      })
      .addCase(fetchEducationalContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchEducationalContentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationalContentById.fulfilled, (state, action) => {
        state.loading = false;
        state.contentDetail = action.payload;
      })
      .addCase(fetchEducationalContentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchFilteredEducationalContent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredEducationalContent.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredContent = action.payload;
      })
      .addCase(fetchFilteredEducationalContent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { sortContentByDate, sortContentByRecommendation } = contentSlice.actions;
export default contentSlice.reducer;