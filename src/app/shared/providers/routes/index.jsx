import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingHomePage from "../../../features/landing/pages/home";
import SignUpPage from "../../../features/authentication/pages/sign-up";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHomePage />}></Route>
        <Route path="/sign-up" element={<SignUpPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesProvider;
