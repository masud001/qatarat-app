import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../language/i18n";

// Define the shape of the language state
interface LanguageState {
  code: string;
  direction: "ltr" | "rtl";
}

// Initial state for the language slice
const initialState: LanguageState = {
  code: "en",
  direction: "ltr",
};

// Create the language slice
const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    // Action to set the language
    setLanguage(state, action: PayloadAction<string>) {
      state.code = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
      i18n.changeLanguage(action.payload);
    },
  },
});

// Export the actions and reducer
export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
