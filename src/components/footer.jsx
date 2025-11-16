import { useLanguage } from "../hooks/use-language";
import "./footer.css";

export const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-inner-container">
          <div className="footer-title">Fakturera</div>
          <nav>
            <ul className="footer-links">
              <li>{t("nav.home")}</li>
              <li>{t("nav.order")}</li>
              <li>{t("nav.contactUs")}</li>
            </ul>
          </nav>
        </div>

        <hr />

        <p className="copyright">&copy; Fakturera, CRO no.638537, 2025. All rights reserved.</p>
      </div>
    </footer>
  );
};
