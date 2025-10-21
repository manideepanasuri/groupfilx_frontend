import { Routes, Route } from "react-router-dom";
import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";
import { Toaster } from "sonner";
import Landing from "@/pages/Landing.tsx";
import { Navbar1 } from "@/components/navbar1.tsx";
import { PageAnimated } from "@/components/top-animaiton.tsx";
import FooterSection from "@/components/sections/footer/default.tsx";
// import Home from "@/pages/Groups";
import { AllowUnAuthenticated, AllowAuthenticated } from "@/components/CheckAuth.tsx";
import { useRefreshToken } from "@/queries/query-task.ts";
import Recommendations from "@/pages/Recommendations";
import { GoogleSuccessAuth } from "@/pages/GoogleAuthPages.tsx";
import ChangePasswordPage from "@/pages/ChangePasswordPage.tsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.tsx";
import TermsAndConditions from "@/pages/TermsAndConditions.tsx";
import Search from "./pages/Search";
import MovieDetails from "./pages/MovieDetails";
import Groups from "@/pages/Groups";

function App() {
  useRefreshToken();
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar1 />
      <main className="flex-grow overflow-auto">
        <Routes>
          <Route
            path="/"
            element={
              <PageAnimated>
                <Landing />
              </PageAnimated>
            }
          />
          <Route
            path="/groups"
            element={
              <AllowAuthenticated>
                <PageAnimated>
                  <Groups/>
                </PageAnimated>
              </AllowAuthenticated>
            }
          />
          <Route
            path="/recommendations"
            element={
              <AllowAuthenticated>
                <PageAnimated>
                  <Recommendations />
                </PageAnimated>
              </AllowAuthenticated>
            }
          />
          <Route
            path="/search"
            element={
              <AllowAuthenticated>
                <PageAnimated>
                  <Search />
                </PageAnimated>
              </AllowAuthenticated>
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              <AllowAuthenticated>
                <PageAnimated>
                  <MovieDetails />
                </PageAnimated>
              </AllowAuthenticated>
            }
          />
          <Route
            path="/login"
            element={
              <AllowUnAuthenticated>
                <PageAnimated>
                  <Login />
                </PageAnimated>
              </AllowUnAuthenticated>
            }
          />
          <Route
            path="/signup"
            element={
              <AllowUnAuthenticated>
                <PageAnimated>
                  <Signup />
                </PageAnimated>
              </AllowUnAuthenticated>
            }
          />
          <Route
            path="/change-password"
            element={
              <PageAnimated>
                <ChangePasswordPage />
              </PageAnimated>
            }
          />
          <Route
            path="/google-auth/success"
            element={
              <AllowUnAuthenticated>
                <PageAnimated>
                  <GoogleSuccessAuth />
                </PageAnimated>
              </AllowUnAuthenticated>
            }
          />
          <Route
            path="/privacy-policy"
            element={
              <PageAnimated>
                <PrivacyPolicy />
              </PageAnimated>
            }
          />
          <Route
            path="/terms-of-service"
            element={
              <PageAnimated>
                <TermsAndConditions />
              </PageAnimated>
            }
          />
        </Routes>
        <Toaster />
      </main>
      <FooterSection />
    </div>
  );
}

export default App;
