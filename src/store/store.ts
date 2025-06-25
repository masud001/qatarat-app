import { configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/themeSlice";
import { api } from "./slices/apiSlice";
import languageReducer from "./slices/languageSlice";

const rootReducer = {
  theme: themeReducer,
  language: languageReducer,
  [api.reducerPath]: api.reducer,
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
