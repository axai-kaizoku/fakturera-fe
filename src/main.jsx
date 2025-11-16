import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, Navigate, RouterProvider } from "react-router";
import Home from "./pages/home/index.jsx";
import Login from "./pages/login/index.jsx";
import Terms from "./pages/terms/index.jsx";
import { useAuth } from "./hooks/use-auth.jsx";
import { Header } from "./components/header.jsx";
import { Footer } from "./components/footer.jsx";

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
};

let router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        ),
      },
      {
        path: "/terms",
        element: (
          <>
            <Header />
            <Terms />
          </>
        ),
      },
      {
        path: "/login",
        element: (
          <>
            <Header />
            <Login />
            <Footer />
          </>
        ),
      },
    ],
    errorElement: <>Oops Route not found !!</>,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
