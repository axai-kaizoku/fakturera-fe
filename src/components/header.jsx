import { DIAMOND } from "../consts/index.js";
import { useLanguage } from "../hooks/use-language.jsx";
import { ToggleLanguage } from "./toggle-language.jsx";
import "./header.css";
import { useState } from "react";

export const Header = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  return (
    <header className="header">
      <div className="header-inner">
        <img src={DIAMOND} alt="logo" className="logo" width={60} height={35} />

        <div className="mobile-header">
          <button
            className="menu-button"
            onClick={() => {
              setOpen((prev) => !prev);
            }}
          >
            ☰
          </button>

          {open ? (
            <div className="mobile-menu">
              <nav>
                <ul className="mobile-nav-ul">
                  <li>
                    <a href="/">{t("nav.home")}</a>
                  </li>
                  <li>
                    <a href="#">{t("nav.order")}</a>
                  </li>
                  <li>
                    <a href="#">{t("nav.ourCustomers")}</a>
                  </li>
                  <li>
                    <a href="#">{t("nav.aboutUs")}</a>
                  </li>
                  <li>
                    <a href="#">{t("nav.contactUs")}</a>
                  </li>
                </ul>
              </nav>
            </div>
          ) : null}
        </div>

        <nav>
          <ul className="header-nav-ul">
            <li className="nav-li">
              <a href="/">{t("nav.home")}</a>
            </li>
            <li className="nav-li">
              <a href="#">{t("nav.order")}</a>
            </li>
            <li className="nav-li">
              <a href="#">{t("nav.ourCustomers")}</a>
            </li>
            <li className="nav-li">
              <a href="#">{t("nav.aboutUs")}</a>
            </li>
            <li className="nav-li">
              <a href="#">{t("nav.contactUs")}</a>
            </li>
            <li>
              <ToggleLanguage />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
