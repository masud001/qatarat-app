import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

// Define the possible theme modes
export type ThemeMode = "light" | "dark" | "system";

// Define the shape of the theme state
interface ThemeState {
  mode: ThemeMode;
}

// Key used for storing theme mode in localStorage
const THEME_KEY = "theme-mode";

// Helper function to retrieve the initial theme mode from localStorage
const getInitialTheme = (): ThemeMode => {
  const stored = localStorage.getItem(THEME_KEY);
  return stored === "light" || stored === "dark" || stored === "system" ? stored : "system";
};

// Initial state for the theme slice
const initialState: ThemeState = {
  mode: getInitialTheme(),
};

// Create the theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    // Action to set the theme mode
    setThemeMode(state, action: PayloadAction<ThemeMode>) {
      state.mode = action.payload;
      localStorage.setItem(THEME_KEY, action.payload);
    },
  },
});

// Export the actions and reducer
export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;
