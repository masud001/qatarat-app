import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import i18n from "../../language/i18n";
interface LanguageState {
  code: string;
  direction: "ltr" | "rtl";
}

const initialState: LanguageState = {
  code: "en",
  direction: "ltr",

};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    setLanguage(state, action: PayloadAction<string>) {
      state.code = action.payload;
      state.direction = action.payload === "ar" ? "rtl" : "ltr";
      i18n.changeLanguage(action.payload);
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
