import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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
import AgendasPage from "../../../features/agenda/pages";
import ConfigurationsPage from "../../../features/configurations/pages";
import MeetingsPage from "../../../features/meetings/pages";
import CompanyJoinPage from "../../../features/companies/pages/company-join";
import TeamsPage from "../../../features/teams/pages";
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
          path="/companies/join/:inviteToken"
          element={<CompanyJoinPage />}
        />
        <Route
          path="/:companyId"
          element={
            <ProtectedRoute>
              <AppPage />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<DashboardPage />}></Route>
          <Route path="teams/:teamId" element={<TeamsPage />}></Route>
          <Route path="chats/:teamId" element={<ChatsPage />}></Route>
          <Route path="mettings/:teamId" element={<MeetingsPage />}></Route>
          <Route path="agendas/:teamId" element={<AgendasPage />}></Route>
          <Route path="configurations" element={<ConfigurationsPage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default RoutesProvider;
