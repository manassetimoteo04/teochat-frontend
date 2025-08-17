import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingHomePage from "../../../features/landing/pages/home";
import SignUpPage from "../../../features/authentication/pages/sign-up";
import SignInPage from "../../../features/authentication/pages/sign-in";
import ConfirmAccountPage from "../../../features/authentication/pages/confirm-account";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHomePage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
        <Route path="/verify-account" element={<ConfirmAccountPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesProvider;
