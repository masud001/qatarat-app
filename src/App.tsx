import React from "react";
import { RouterProvider } from "react-router-dom";
import { Provider, useSelector } from "react-redux";
import store, { type RootState } from "./store/store";
import router from "./routes/router";
import "./language/i18n";

function ThemeWrapper({ children }: { children: React.ReactNode }) {
  const themeMode = useSelector((state: RootState) => state.theme.mode);
  const { direction } = useSelector((state: RootState) => state.language);

  React.useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "system") {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.setAttribute("data-theme", prefersDark ? "dark" : "light");
    } else {
      root.setAttribute("data-theme", themeMode);
    }
  }, [themeMode]);

  return <main dir={direction} className="max-w-[1440px] mx-auto bg-white text-(--text-color)">{children}</main>;
}

function App() {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <RouterProvider router={router}/>
      </ThemeWrapper>
    </Provider>
  );
}

export default App;
