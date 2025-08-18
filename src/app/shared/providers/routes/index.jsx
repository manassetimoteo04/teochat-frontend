import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingHomePage from "../../../features/landing/pages/home";

function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHomePage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesProvider;
