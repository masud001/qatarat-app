import React from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store/store";
import { setLanguage } from "../store/slices/languageSlice";

const languages = [
  { code: "en", label: "Eng", flag: "/images/flags/flags-eng.svg" },
  { code: "ar", label: "Arb", flag: "/images/flags/flags-eng.svg" },
];

interface LanguageDropdownProps {
  isDropdownDisabled?: boolean; 
}

const LanguageDropdown: React.FC<LanguageDropdownProps> = ({ isDropdownDisabled = false }) => {
  const dispatch = useDispatch();
  const { code: selectedLanguage } = useSelector((state: RootState) => state.language);
  const [open, setOpen] = React.useState(false);

  const handleSelect = (lang: string) => {
    dispatch(setLanguage(lang));
    setOpen(false);
  };

  const selectedLang = languages.find((l) => l.code === selectedLanguage) || languages[0];

  return (
    <div className="relative">
      <DropdownButton
        selectedLang={selectedLang}
        isDropdownDisabled={isDropdownDisabled}
        open={open}
        setOpen={setOpen}
      />
      {open && !isDropdownDisabled && (
        <DropdownMenu
          languages={languages}
          selectedLang={selectedLang}
          handleSelect={handleSelect}
        />
      )}
    </div>
  );
};

const DropdownButton: React.FC<{
  selectedLang: { code: string; label: string; flag: string };
  isDropdownDisabled: boolean;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ selectedLang, isDropdownDisabled, open, setOpen }) => (
  <button
    className={`border border-gray-300 flex items-center gap-1 py-2 px-3 rounded-full ${
      isDropdownDisabled ? "cursor-not-allowed opacity-50" : ""
    }`}
    onClick={() => {
      if (!isDropdownDisabled) {
        setOpen((v) => !v);
      }
    }}
    aria-haspopup="true"
    aria-expanded={open}
  >
    <img
      src={selectedLang.flag}
      alt={`${selectedLang.code} flag`}
      className="w-5 h-5 rounded-full object-cover"
    />
    <span className="font-normal text-sm text-(--text-color) leading-[19.6px] open-sauce-sans">
      {selectedLang.label}
    </span>
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

const DropdownMenu: React.FC<{
  languages: Array<{ code: string; label: string; flag: string }>;
  selectedLang: { code: string; label: string; flag: string };
  handleSelect: (lang: string) => void;
}> = ({ languages, selectedLang, handleSelect }) => (
  <div className="absolute right-0 mt-2 w-25 bg-white rounded shadow-lg z-10 border border-gray-300">
    {languages.map((lang) => (
      <button
        key={lang.code}
        className={`w-full flex items-center gap-2 p-2 hover:bg-gray-100 rounded ${
          selectedLang.code === lang.code ? "bg-(--theme-color) !text-white" : "text-(--text-color)"
        }`}
        onClick={() => handleSelect(lang.code)}
      >
        <img
          src={lang.flag}
          alt={`${lang.code} flag`}
          className="w-5 h-5 rounded-full object-cover"
        />
        <span
          className={`${
            selectedLang.code === lang.code ? "text-white" : ""
          } font-normal text-sm text-(--text-color) leading-[19.6px] open-sauce-sans`}
        >
          {lang.label}
        </span>
      </button>
    ))}
  </div>
);

export default LanguageDropdown;