import { createContext, useEffect, useState } from "react";
import { login as apiLogin, verifyToken } from "../api/auth";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      const savedToken = localStorage.getItem("token");

      if (savedToken) {
        try {
          const res = await verifyToken(savedToken);
          if (res.error) {
            localStorage.removeItem("token");
            setToken(null);
            return;
          }
          setUser(res.user);
          setToken(savedToken);
        } catch (error) {
          console.log("Token error:", error);
          localStorage.removeItem("token");
          setToken(null);
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const response = await apiLogin(email, password);
      if (response.error) {
        return {
          error: true,
          message: response.data,
        };
      }
      setUser(response.user);
      setToken(response.token);
      localStorage.setItem("token", response.token);
      return { error: false };
    } catch (error) {
      return {
        error: true,
        message: error.response?.data?.error || "Login failed",
      };
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  const value = {
    user,
    token,
    login,
    logout,
    isAuthenticated: !!token,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
