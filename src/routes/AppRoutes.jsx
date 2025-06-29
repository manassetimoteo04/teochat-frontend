import { Route, Routes } from "react-router-dom";
import AppLayout from "../components/AppLayout";
<<<<<<< HEAD
=======
import Conversations from "../pages/Conversations";
import Settings from "../pages/Settings";
import Calls from "../pages/Calls";
>>>>>>> 26a9d0f (primeiro commit)

function AppRoutes() {
  return (
    <Routes>
<<<<<<< HEAD
      <Route index element={<AppLayout />}></Route>
=======
      <Route path="/" element={<AppLayout />}>
        <Route path="/conversations" element={<Conversations />} />
        <Route path="/calls" element={<Calls />} />
        <Route path="/settings" element={<Settings />} />
      </Route>
>>>>>>> 26a9d0f (primeiro commit)
    </Routes>
  );
}

export default AppRoutes;
