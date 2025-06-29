import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
import Conversations from "../pages/Conversations";
import Settings from "../pages/Settings";
import Calls from "../pages/Calls";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
