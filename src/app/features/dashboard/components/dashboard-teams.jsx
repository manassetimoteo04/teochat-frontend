import { ChevronLeft, ChevronRight } from "lucide-react";
import CardBox from "../ui/card-box";
import { useCompanyTeams } from "../../teams/hooks/use-company-teams";

function DashboardTeams() {
  const { data, isPending } = useCompanyTeams();
  console.log(data, isPending);
  return (
    <CardBox
      title="Equipes da Empresa"
      action={
        <div className="flex gap-[1rem] text-secondary-text-color ">
          <button className="cursor-pointer hover:text-main-text-color bg-gray-100 p-[0.3rem] rounded-lg">
            <ChevronLeft size={20} />
          </button>
          <button className="cursor-pointer hover:text-main-text-color bg-gray-100 p-[0.3rem] rounded-lg">
            <ChevronRight size={20} />
          </button>
        </div>
      }
    >
      <div>
        {data?.map((team) => (
          <div
            key={team._id}
            className="grid p-[0.5rem_2rem] border-b last:border-b-0 items-center grid-cols-[5rem_1fr] gap-[1rem]"
          >
            <img
              src="/default-user.jpg"
              alt=""
              className="w-[5rem] rounded-full h-[5rem]"
            />
            <div className="flex  p-[0.5rem_0] justify-between items-center">
              <div>
                <p className="text-main-text-color">{team.name}</p>
                <span className="text-secondary-text-color">
                  {team.members.length} membros
                </span>
              </div>
              <button className="text-secondary-text-color">
                <ChevronRight />
              </button>
            </div>
          </div>
        ))}
      </div>
    </CardBox>
  );
}

export default DashboardTeams;
