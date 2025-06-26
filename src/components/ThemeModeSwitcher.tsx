import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setThemeMode, type ThemeMode } from "../store/slices/themeSlice";

const themeOptions: { label: string; value: ThemeMode }[] = [
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
  { label: "System", value: "system" },
];

const ThemeModeSwitcher: React.FC = () => {
  const dispatch = useDispatch();
  const mode = useSelector((state: RootState) => state.theme.mode);
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const root = window.document.documentElement;
    if (mode === "system") {
      const isDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      root.classList.toggle("dark", isDark);
    } else {
      root.classList.toggle("dark", mode === "dark");
    }
  }, [mode]);

  const handleThemeChange = (theme: ThemeMode) => {
    dispatch(setThemeMode(theme));
    setOpen(false);
  };

  const currentLabel = themeOptions.find((opt) => opt.value === mode)?.label || "System";

  return (
    <div className="relative">
      <ThemeButton currentLabel={currentLabel} open={open} setOpen={setOpen} />
      {open && (
        <ThemeDropdown
          themeOptions={themeOptions}
          mode={mode}
          handleThemeChange={handleThemeChange}
        />
      )}
    </div>
  );
};

const ThemeButton: React.FC<{
  currentLabel: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ currentLabel, open, setOpen }) => (
  <button
    className="flex items-center gap-2 px-4 py-2 rounded bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none"
    onClick={() => setOpen((v) => !v)}
    aria-haspopup="true"
    aria-expanded={open}
  >
    Theme: {currentLabel}
    <svg
      className="w-4 h-4 ml-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  </button>
);

const ThemeDropdown: React.FC<{
  themeOptions: { label: string; value: ThemeMode }[];
  mode: ThemeMode;
  handleThemeChange: (theme: ThemeMode) => void;
}> = ({ themeOptions, mode, handleThemeChange }) => (
  <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded shadow-lg z-10 border border-gray-200 dark:border-gray-700">
    {themeOptions.map((opt) => (
      <button
        key={opt.value}
        className={`w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded flex items-center gap-2 ${
          mode === opt.value
            ? "bg-blue-500 text-white dark:bg-blue-600"
            : "text-gray-900 dark:text-gray-200"
        }`}
        onClick={() => handleThemeChange(opt.value)}
        aria-current={mode === opt.value ? "true" : undefined}
      >
        {opt.label}
        {mode === opt.value && (
          <svg
            className="w-4 h-4 ml-auto"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>
    ))}
  </div>
);

export default ThemeModeSwitcher;