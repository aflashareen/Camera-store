import { configureStore } from '@reduxjs/toolkit';
import searchReducer from './slice/searchSlice'

export const store = configureStore({
  reducer: {
    search: searchReducer,
  },
});