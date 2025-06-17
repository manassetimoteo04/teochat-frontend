import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";

function AppRoutes() {
  return (
    <Routes>
      <Route index element={<AppLayout />}></Route>
    </Routes>
  );
}

export default AppRoutes;
