import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { AuthenticationPage } from "./pages/AuthenticationPage";
import { NotFoundPage } from "./pages/page-not-found/NotFoundPage";
import { Footer } from "./components/footer/Footer";
import { AuthenticationProvider, useAuth } from "./context/useAuth";
import { AuthenticationFormMode } from "./components/authentication-form/AuthenticationForm";

function AppContent() {
  const { isLoggedIn } = useAuth();
  console.log(isLoggedIn);

  return (
    <div className="app-container">
      {isLoggedIn ? <Header /> : null}
      <main>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? <HomePage /> : <Navigate to="/signin" replace />
            }
          />
          <Route
            path="/signin"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <AuthenticationPage mode={AuthenticationFormMode.SIGNIN} />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isLoggedIn ? (
                <Navigate to="/" replace />
              ) : (
                <AuthenticationPage mode={AuthenticationFormMode.SIGNUP} />
              )
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthenticationProvider>
        <AppContent />
      </AuthenticationProvider>
    </BrowserRouter>
  );
}

export default App;
