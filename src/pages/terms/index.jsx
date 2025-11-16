import { useNavigate } from "react-router";
import { useLanguage } from "../../hooks/use-language";
import "./terms.css";

const Terms = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const data = [];

  for (let i = 1; i <= 25; i++) {
    data.push({
      id: i,
      point: t(`terms.point${i}`),
    });
  }

  return (
    <div className="terms-container">
      <div className="terms-header">
        <h1>{t("terms.title")}</h1>
        <button className="back-button" onClick={() => navigate(-1)}>
          {t("terms.closeAndGoBack")}
        </button>
      </div>

      <div className="terms-content">
        {data.map((item) => (
          <p key={item.id}>{item.point}</p>
        ))}
      </div>
      <button className="back-button" onClick={() => navigate(-1)}>
        {t("terms.closeAndGoBack")}
      </button>
    </div>
  );
};

export default Terms;
