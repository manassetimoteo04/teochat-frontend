import { ListFilter, SortAsc, Trash2 } from "lucide-react";
import InputSearch from "../../../shared/ui/input-search";
import Table from "../../../shared/ui/table";
import Spinner from "../../../shared/ui/Spinner";
import ProjectListRow from "./project-list-row";
import Pagination from "../../../shared/ui/pagination";
import { useTeamProjects } from "../hooks/use-team-projects";
import EmptyList from "../../../shared/ui/empty-list";
import { useEffect, useState } from "react";
import CheckBox from "../../../shared/ui/check-box";
import Modal from "../../../shared/ui/modal";
import DeleteAlert from "../../../shared/ui/delete-alert";
import Menus from "../../../shared/ui/Menus";
import { useBreakpoint } from "../../../shared/hooks/use-breakpont";
import Tag from "../../../shared/ui/tag";

function ProjectsList() {
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");
  const [range, setRange] = useState("all");
  const [page, setPage] = useState(1);
  const limit = 10;
  const [sort, setSort] = useState("createdAt_desc");
  const { data, meta, isPending } = useTeamProjects({
    query,
    range,
    page,
    limit,
    sort,
  });
  function handleSelect(value) {
    setSelected((values) =>
      values.some((som) => som === value)
        ? values.filter((val) => val !== value)
        : [...values, value],
    );
  }
  useEffect(() => {
    setPage(1);
  }, [query, range, sort]);
  const { isXs, isSm, isMd, isLg } = useBreakpoint();
  if (isPending) return <Spinner />;

  let columns = "4rem 1.3fr 1fr 0.8fr 0.8fr 0.8fr 4rem";
  if (isXs) columns = "4rem 1.3fr   4rem";
  if (isSm) columns = "4rem 1.3fr 1fr  4rem";
  if (isMd) columns = "4rem 1.3fr 1fr 0.8fr 4rem";
  if (isLg) columns = "4rem 1.3fr 1fr 0.8fr 0.8fr 0.8fr 4rem";
  return (
    <Modal>
      <div className="bg-white p-[2rem] border border-gray-100 rounded-2xl">
        <div className="flex gap-[1rem] justify-between items-center mb-[2rem] flex-wrap">
          <div className="w-full md:max-w-[32rem]">
            <InputSearch value={query} setValue={setQuery} />
          </div>
          <div className="flex gap-[0.5rem]">
            <button
              className="bg-gray-100 hover:text-main-text-color flex gap-[0.4rem] p-[0.5rem] rounded-2xl border text-[1.4rem] items-center justify-center text-secondary-text-color"
              onClick={() =>
                setSort((s) =>
                  s === "createdAt_desc" ? "createdAt_asc" : "createdAt_desc",
                )
              }
              title="Ordenar por criação"
            >
              <SortAsc size={18} />
            </button>
            <button
              className="bg-gray-100 hover:text-main-text-color flex gap-[0.4rem] p-[0.5rem] rounded-2xl border text-[1.4rem] items-center justify-center text-secondary-text-color"
              title="Filtros"
            >
              <ListFilter size={18} />
            </button>
          </div>
          <div className="flex flex-wrap gap-[0.5rem]">
            <Tag
              type={range === "week" ? "active" : "pending"}
              onClick={() => setRange("week")}
              className="cursor-pointer"
            >
              Esta semana
            </Tag>
            <Tag
              type={range === "month" ? "active" : "pending"}
              onClick={() => setRange("month")}
              className="cursor-pointer"
            >
              Este mês
            </Tag>
            <Tag
              type={range === "all" ? "active" : "pending"}
              onClick={() => setRange("all")}
              className="cursor-pointer"
            >
              Todos
            </Tag>
          </div>
        </div>
        {selected?.length > 0 && (
          <div className="mb-[1rem] px-[1rem] flex gap-[2rem]">
            <div className="flex gap-[0.5rem] items-center">
              <CheckBox value={true} />{" "}
              <span>{selected?.length} selecionado(s)</span>
            </div>
            <Modal.Open id="delete-many-project">
              <button className="bg-red-500 hover:bg-red-600 text-white flex gap-[0.4rem] p-[0.4rem_1rem] rounded-2xl  text-[1.4rem] items-center justify-center ">
                <Trash2 size={18} /> Eliminar
              </button>
            </Modal.Open>
          </div>
        )}
        <Table columns={columns}>
          <Table.Header>
            <span className="p-[1.5rem_1rem]  flex items-center"></span>
            <span className="p-[1.5rem_1rem]  flex items-center">Nome</span>
            <span className="p-[1.5rem_1rem] hidden sm:flex items-center">
              Criado Por
            </span>
            <span className="p-[1.5rem_1rem] hidden  items-center">
              Criado Em
            </span>
            <span className="p-[1.5rem_1rem] hidden   items-center">
              Término
            </span>
            <span className="p-[1.5rem_1rem] hidden md:flex items-center">
              Progresso
            </span>
          </Table.Header>
          <Menus>
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
          </Menus>
          {data?.length < 1 && (
            <EmptyList
              opensId="create-project-form"
              title="Nenhum projecto foi encontrado nesta equipa"
            />
          )}
          <Table.Footer>
            <Pagination
              page={page}
              totalPages={
                meta?.totalPages
                  ? meta.totalPages
                  : data.length < limit
                    ? page
                    : page + 1
              }
              onPageChange={setPage}
              isLoading={isPending}
            />
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
