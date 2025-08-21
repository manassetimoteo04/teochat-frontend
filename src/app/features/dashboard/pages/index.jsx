import { Plus } from "lucide-react";
import PageHeader from "../../../shared/ui/page-heading";
import { useAppContext } from "../../../shared/providers/context";
import Stats from "../components/stats";
function DashboardPage() {
  const { currentUser } = useAppContext();
  return (
    <div>
      <PageHeader
        title={"Seja bem-vindo, " + currentUser?.name}
        description="Análise a productividade das tuas equipes, eventos próximos e mais"
      >
        <div className="flex gap">
          <button className="bg-main-color p-[0.8rem_1.5rem] hover:bg-green-600 overflow-hidden active:shadow-md active:-translate-y-1 flex gap-2 items-center justify-center  text-white rounded-full">
            <Plus size={20} />
            Novo
          </button>
        </div>
      </PageHeader>
      <Stats />
    </div>
  );
}

export default DashboardPage;
