import { Plus } from "lucide-react";
import Button from "../../../shared/ui/button";
import Spinner from "../../../shared/ui/Spinner";
import CompanyBox from "../ui/company-box";
import { useCompanies } from "../hooks/use-companies";
import { useNavigate } from "react-router-dom";

function CompaniesList() {
  const navigate = useNavigate();
  const { data: companies, isPending } = useCompanies();

  if (isPending) return <Spinner />;
  return (
    <div className="max-w-[100rem] rounded-2xl mt-[8rem] border border-main-border-color bg-main-bg-color-2 m-[0_auto]">
      <header className="flex gap-[1rem] flex-col justify-between p-[2rem]  border-b border-main-border-color">
        <h3 className="text-[1.8rem]">Minhas Empresas</h3>
        <div className="flex justify-between">
          <input
            type="text"
            placeholder="Procurar Empresa"
            className="bg-gray-50 border focus:outline-none !transition-none focus:bottom-1 focus:border-green-600 border-main-border-color p-[1rem_1.2rem] rounded-xl"
          />

          <Button onClick={() => navigate("create")}>
            Criar Empresa <Plus />
          </Button>
        </div>
      </header>
      <div className="grid p-[2rem]  gap-[4rem] grid-cols-3 py-[4rem]">
        {companies.map((company, index) => (
          <CompanyBox company={company} key={index} />
        ))}
      </div>
    </div>
  );
}

export default CompaniesList;
