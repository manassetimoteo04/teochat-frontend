import { BrowserRouter, Route, Routes } from "react-router-dom";
import LandingHomePage from "../../../features/landing/pages/home";
import SignUpPage from "../../../features/authentication/pages/sign-up";
import SignInPage from "../../../features/authentication/pages/sign-in";
import ConfirmAccountPage from "../../../features/authentication/pages/confirm-account";
import CompaniesPage from "../../../features/companies/pages/companies";
import AppPage from "../../pages/app-page";
import ProtectedRoute from "../../ui/protected-route";
import CreateCompany from "../../../features/companies/pages/create-company";
import DashboardPage from "../../../features/dashboard/pages";
import ChatsPage from "../../../features/chats/pages";
import CallsPage from "../../../features/calls/pages";
import AgendasPage from "../../../features/agenda/pages";
import ConfigurationsPage from "../../../features/configurations/pages";
function RoutesProvider() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingHomePage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/verify-account" element={<ConfirmAccountPage />} />
        <Route path="/companies" element={<CompaniesPage />} />
        <Route path="/companies/create" element={<CreateCompany />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <AppPage />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="teams" element={<DashboardPage />}></Route>
          <Route path="chats" element={<ChatsPage />}></Route>
          <Route path="calls" element={<CallsPage />}></Route>
          <Route path="agendas" element={<AgendasPage />}></Route>
          <Route path="configurations" element={<ConfigurationsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesProvider;
