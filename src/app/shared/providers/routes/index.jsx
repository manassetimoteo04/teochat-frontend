import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingHomePage from "../../../features/landing/pages/home";
import SignUpPage from "../../../features/authentication/pages/sign-up";
import SignInPage from "../../../features/authentication/pages/sign-in";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHomePage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
        <Route path="/sign-in" element={<SignInPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesProvider;
