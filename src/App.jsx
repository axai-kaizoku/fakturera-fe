import { Outlet, ScrollRestoration } from "react-router";
import { AuthProvider } from "./contexts/auth-context";
import { LanguageProvider } from "./contexts/language-context";

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <main className="main">
          <ScrollRestoration />
          <Outlet />
        </main>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;
