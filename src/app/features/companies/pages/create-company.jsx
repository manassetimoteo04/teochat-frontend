import { LogOutIcon } from "lucide-react";
import CreateCompanyForm from "../components/create-company-form";
import Logo from "../../../shared/ui/logo";

function CreateCompany() {
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
      <CreateCompanyForm />
    </div>
  );
}

export default CreateCompany;
