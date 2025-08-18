import { LogOutIcon } from "lucide-react";
import CompaniesList from "../components/companies-list";
import Logo from "../../../shared/ui/logo";

function CompaniesPage() {
  return (
    <div className="bg-main-bg-color   h-screen">
      <div>
        <header className="p-[2rem_4rem]  flex justify-between items-center">
          <Logo />
          <button className="text-secondary-text-color">
            <LogOutIcon />
          </button>
        </header>
      </div>
      <CompaniesList />
    </div>
  );
}

export default CompaniesPage;
