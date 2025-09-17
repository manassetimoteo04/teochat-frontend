import { Filter, ListFilter, SortAsc } from "lucide-react";
import ButtonIcon from "../../../shared/ui/button-icon";
import InputSearch from "../../../shared/ui/input-search";
import Table from "../../../shared/ui/table";
import Spinner from "../../../shared/ui/Spinner";
import ProjectListRow from "./project-list-row";
import Pagination from "../../../shared/ui/pagination";
import { useTeamProjects } from "../hooks/use-team-projects";
import EmptyList from "../../../shared/ui/empty-list";

function ProjectsList() {
  const { data, isPending } = useTeamProjects();
  if (isPending) return <Spinner />;
  return (
    <div className="bg-white p-[2rem] border border-gray-100 rounded-2xl">
      <div className="flex justify-between items-center mb-[2rem]">
        <div>
          <InputSearch />
        </div>
        <div>
          <ButtonIcon>
            <SortAsc />
          </ButtonIcon>
          <ButtonIcon>
            <ListFilter />
          </ButtonIcon>
        </div>
      </div>
      <Table columns="4rem 1.3fr 1fr 0.8fr 0.8fr 0.8fr 4rem">
        <Table.Header>
          <span className="p-[1.5rem_1rem]  flex items-center"></span>
          <span className="p-[1.5rem_1rem]  flex items-center">Nome</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Criado Por</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Criado Em</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Término</span>
          <span className="p-[1.5rem_1rem]  flex items-center">Progresso</span>
        </Table.Header>
        <Table.Body
          data={data}
          render={(data) => <ProjectListRow data={data} key={data.id} />}
        />
        {data.length < 1 && (
          <EmptyList
            opensId="create-project-form"
            title="Nenhum projecto foi encontrado nesta equipa"
          />
        )}
        <Table.Footer>
          <Pagination />
        </Table.Footer>
      </Table>
    </div>
  );
}

export default ProjectsList;
