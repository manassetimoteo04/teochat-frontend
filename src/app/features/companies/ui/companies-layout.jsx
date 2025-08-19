import { LogOutIcon } from "lucide-react";
import Logo from "../../../shared/ui/logo";
function CompaniesLayout({ children }) {
  return (
    <div className="bg-main-bg-color overflow-scroll  h-screen">
      <div>
        <header className="p-[2rem_4rem]  flex justify-between items-center">
          <Logo />
          <button className="text-secondary-text-color">
            <LogOutIcon />
          </button>
        </header>
      </div>
      {children}
    </div>
  );
}

export default CompaniesLayout;
