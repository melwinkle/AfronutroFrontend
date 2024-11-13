import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import contentReducer from './slices/contentSlice';
import recipeReducer from './slices/recipeSlice';
import assessmentReducer from "./slices/assessmentSlice";
import mealplansReducer from "./slices/mealplansSlice";
import dataReducer from "./slices/dataSlice";
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';


const persistConfig = {
  key: 'auth',
  storage,
  whitelist: ['user', 'isAuthenticated'],
};

const persistedReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedReducer,
    content: contentReducer,
    recipes: recipeReducer,
    assessment: assessmentReducer,
    mealplans: mealplansReducer,
    data:dataReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      },
    }),
});

const persistor = persistStore(store);

// Export persistor as named export
export { persistor };

// Export store as default export
export default store;
