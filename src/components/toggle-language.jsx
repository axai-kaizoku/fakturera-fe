import { useState } from "react";
import { SWEDISH_FLAG, UK_FLAG } from "../consts/index.js";
import { useLanguage } from "../hooks/use-language";
import "./toggle-language.css";

export const ToggleLanguage = () => {
  const { language, changeLanguage } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <div className="toggle-container">
      <button
        className="toggle-language-button"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
        onBlur={() => {
          setTimeout(() => setOpen(false), 200);
        }}
      >
        {language === "en" ? "English" : "Svenska"}

        <img
          src={language === "en" ? UK_FLAG : SWEDISH_FLAG}
          alt="language"
          width={25}
          height={20}
          className="toggle-flag"
        />
      </button>

      {open ? (
        <div className="toggle-language-options-container">
          <div
            className="toggle-language-option"
            onClick={() => {
              changeLanguage("sv");
              setOpen(false);
            }}
          >
            Svenska
            <img src={SWEDISH_FLAG} alt="language" width={20} height={15} />
          </div>
          <div
            className="toggle-language-option"
            onClick={() => {
              changeLanguage("en");
              setOpen(false);
            }}
          >
            English
            <img src={UK_FLAG} alt="language" width={20} height={15} />
          </div>
        </div>
      ) : null}
    </div>
  );
};
