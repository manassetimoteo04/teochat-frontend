import { Filter, ListFilter, SortAsc, Trash, Trash2 } from "lucide-react";
import ButtonIcon from "../../../shared/ui/button-icon";
import InputSearch from "../../../shared/ui/input-search";
import Table from "../../../shared/ui/table";
import Spinner from "../../../shared/ui/Spinner";
import ProjectListRow from "./project-list-row";
import Pagination from "../../../shared/ui/pagination";
import { useTeamProjects } from "../hooks/use-team-projects";
import EmptyList from "../../../shared/ui/empty-list";
import { useState } from "react";
import CheckBox from "../../../shared/ui/check-box";
import Modal from "../../../shared/ui/modal";
import DeleteAlert from "../../../shared/ui/delete-alert";

function ProjectsList() {
  const [selected, setSelected] = useState([]);
  const { data, isPending } = useTeamProjects();
  function handleSelect(value) {
    setSelected((values) =>
      values.some((som) => som === value)
        ? values.filter((val) => val !== value)
        : [...values, value]
    );
  }
  if (isPending) return <Spinner />;
  return (
    <Modal>
      <div className="bg-white p-[2rem] border border-gray-100 rounded-2xl">
        <div className="flex justify-between items-center mb-[2rem]">
          <div>
            <InputSearch />
          </div>
          <div className="flex gap-[1rem]">
            <button className="bg-gray-100 hover:text-main-text-color flex gap-[0.4rem] p-[0.4rem_1rem] rounded-2xl border text-[1.4rem] items-center justify-center text-secondary-text-color">
              <SortAsc size={18} /> Ordenar
            </button>
            <button className="bg-gray-100 hover:text-main-text-color flex gap-[0.4rem] p-[0.4rem_1rem] rounded-2xl border text-[1.4rem] items-center justify-center text-secondary-text-color">
              <ListFilter size={18} /> Filtrar
            </button>
          </div>
        </div>
        {selected.length > 0 && (
          <div className="mb-[1rem] px-[2rem] flex gap-[2rem]">
            <div className="flex gap-[0.5rem] items-center">
              <CheckBox value={true} />{" "}
              <span>{selected.length} selecionado(s)</span>
            </div>
            <Modal.Open id="delete-many-project">
              <button className="bg-red-500 hover:bg-red-600 text-white flex gap-[0.4rem] p-[0.4rem_1rem] rounded-2xl  text-[1.4rem] items-center justify-center ">
                <Trash2 size={18} /> Eliminar
              </button>
            </Modal.Open>
          </div>
        )}
        <Table columns="4rem 1.3fr 1fr 0.8fr 0.8fr 0.8fr 4rem">
          <Table.Header>
            <span className="p-[1.5rem_1rem]  flex items-center"></span>
            <span className="p-[1.5rem_1rem]  flex items-center">Nome</span>
            <span className="p-[1.5rem_1rem]  flex items-center">
              Criado Por
            </span>
            <span className="p-[1.5rem_1rem]  flex items-center">
              Criado Em
            </span>
            <span className="p-[1.5rem_1rem]  flex items-center">Término</span>
            <span className="p-[1.5rem_1rem]  flex items-center">
              Progresso
            </span>
          </Table.Header>
          <Table.Body
            data={data}
            render={(data) => (
              <ProjectListRow
                onSelect={handleSelect}
                selected={selected}
                data={data}
                key={data.id}
              />
            )}
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
      <Modal.Window id="delete-many-project">
        <DeleteAlert title="Projectos" description="estes projectos" />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectsList;
