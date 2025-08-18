import Logo from "./logo";
import { RefreshCcw } from "lucide-react";
function CurrentCompany() {
  return (
    <div className="p-[1rem] relative shadow-md bg-gray-50 border border-gray-200 text-secondary-text-color rounded-3xl    grid grid-cols-[4rem_1fr] items-center">
      <div className="h-[3rem] w-[3rem] flex items-center justify-center rounded-full bg-white border border-gray-200">
        <img
          src="/logo.png"
          alt="TeoChat Logo"
          className="sm:w-[2rem] w-[1rem] h-auto"
        />
      </div>
      <div className="flex flex-col justify-center">
        <p className="text-main-text-color text-[1.4rem]">TeoChat .inc</p>
        <span className="text-[1.2rem]">Admin</span>
      </div>
      <button className="absolute right-[1.5rem]">
        <RefreshCcw size={18} />
      </button>
    </div>
  );
}

export default CurrentCompany;
