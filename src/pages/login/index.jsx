import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../hooks/use-auth.jsx";
import { useLanguage } from "../../hooks/use-language.jsx";
import "./login.css";

const Login = () => {
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const { t } = useLanguage();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    const result = await login(email, password);

    if (!result.error) {
      navigate("/");
    } else {
      setError(result.message);
    }

    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>{t("login.title")}</h1>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>{t("login.emailLabel")}</label>
            <input type="email" ref={emailRef} required placeholder={t("login.emailAddress")} autoComplete="username" />
          </div>

          <div className="form-group">
            <label>{t("login.passwordLabel")}</label>
            <input
              type="password"
              ref={passwordRef}
              required
              placeholder={t("login.password")}
              autoComplete="current-password"
            />
          </div>

          {error ? <p className="error-message">{t("login.error")}</p> : null}

          <button type="submit" disabled={loading} className="login-button">
            {loading ? "..." : t("login.button")}
          </button>
        </form>
        <div className="forgotten-section">
          <button className="login-register-btn">{t("login.register")}</button>
          <button className="login-forgot-btn">{t("login.forgottenPassword")}</button>
        </div>
      </div>
    </div>
  );
};

export default Login;
