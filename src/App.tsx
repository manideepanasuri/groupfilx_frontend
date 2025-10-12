
import {Routes,Route} from "react-router-dom";
import Login from "@/pages/Login.tsx";
import Signup from "@/pages/Signup.tsx";
import {Toaster} from "sonner";
import Landing from "@/pages/Landing.tsx";
import {Navbar1} from "@/components/navbar1.tsx";
import {PageAnimated} from "@/components/top-animaiton.tsx";
import FooterSection from "@/components/sections/footer/default.tsx";
import Home from "@/pages/Home.tsx";
import {AllowUnAuthenticated,AllowAuthenticated} from "@/components/CheckAuth.tsx";
import {useRefreshToken} from "@/queries/query-task.ts";
import History from "@/pages/History.tsx";
import {GoogleSuccessAuth} from "@/pages/GoogleAuthPages.tsx";
import ChangePasswordPage from "@/pages/ChangePasswordPage.tsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.tsx";
import TermsAndConditions from "@/pages/TermsAndConditions.tsx";


function App() {
  useRefreshToken()
  return (
    <div className="px-3 h-screen flex flex-col justify-between">
      <div className="flex-1 flex flex-col">


      <Navbar1/>

      <Routes>
        <Route path="/" element={
          <PageAnimated>
            <Landing/>
          </PageAnimated>
        } />
        <Route path="/home" element={
         <AllowAuthenticated>
          <PageAnimated>
            <Home/>
          </PageAnimated>
         </AllowAuthenticated>
        } />
        <Route path="/history" element={
          <AllowAuthenticated>
            <PageAnimated>
              <History/>
            </PageAnimated>
          </AllowAuthenticated>
        } />
        <Route path="/login" element={
          <AllowUnAuthenticated>
            <PageAnimated>
              <Login/>
            </PageAnimated>
          </AllowUnAuthenticated>
        }/>
        <Route path="/signup" element={
          <AllowUnAuthenticated>
            <PageAnimated>
              <Signup/>
            </PageAnimated>
          </AllowUnAuthenticated>
        }/>
        <Route path="/change-password" element={
          <>
            <PageAnimated>
              <ChangePasswordPage/>
            </PageAnimated>
          </>
        }/>
        <Route path="/google-auth/success" element={
          <AllowUnAuthenticated>
            <PageAnimated>
              <GoogleSuccessAuth/>
            </PageAnimated>
          </AllowUnAuthenticated>
        }/>
        <Route path="/privacy-policy" element={
          <>
            <PageAnimated>
              <PrivacyPolicy/>
            </PageAnimated>
          </>
        }/>
        <Route path="/terms-of-service" element={
          <>
            <PageAnimated>
              <TermsAndConditions/>
            </PageAnimated>
          </>
        }/>
      </Routes>
      <Toaster/>
      </div>
      <FooterSection/>
    </div>
  )
}

export default App
