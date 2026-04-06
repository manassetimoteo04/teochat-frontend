import { CalendarDays, CheckCircle2, Flag, Plus, UserRound } from "lucide-react";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import PageHeader from "../../../shared/ui/page-heading";
import ProjectDetailsNav from "../components/project-details/project-details-nav";
import ProjectTasks from "../components/project-details/project-tasks";
import { CreateProjectTaskForm } from "../components/create-project-task-form";
import { useGetProjectById } from "../hooks/use-get-project-by-id";
import Spinner from "../../../shared/ui/Spinner";
import Tag from "../../../shared/ui/tag";
import { formatDate } from "../../../shared/utils/helpers";
import { useGetTasksByProjectId } from "../hooks/use-get-tasks-by-project-id";
import { useEffect, useState } from "react";

function ProjectDetailsPage() {
  const { data, isPending } = useGetProjectById();
  const { data: tasks = [] } = useGetTasksByProjectId();
  const [view, setView] = useState("board");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sort, setSort] = useState("createdAt_desc");
  const [showFilters, setShowFilters] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, priorityFilter, sort, view]);
  const totalTasks = tasks.length;
  const doneTasks = tasks.filter((task) => task.status === "done").length;
  const progress = totalTasks ? Math.round((doneTasks / totalTasks) * 100) : 0;

  if (isPending) return <Spinner />;
  return (
    <Modal>
      <PageHeader title={data.name} description={data.description}>
        <div>
          <Modal.Open id="create-project-taskform">
            <Button>
              <Plus /> <span className="hidden md:flex">Nova Tarefa</span>
            </Button>
          </Modal.Open>
        </div>
      </PageHeader>
      <section className="px-[2rem] pb-[2rem]">
        <div className="grid gap-[1.5rem] lg:grid-cols-[2fr_1fr]">
          <div className="bg-white border border-gray-200 rounded-3xl p-[2rem]">
            <div className="flex flex-wrap items-center gap-[0.8rem]">
              <Tag type="pending">{data?.status || "Ativo"}</Tag>
              {data?.priority && <Tag type="active">{data.priority}</Tag>}
            </div>
            <h2 className="text-[2.2rem] text-main-text-color font-semibold mt-[0.8rem]">
              {data?.name}
            </h2>
            <p className="text-secondary-text-color mt-[0.5rem] max-w-[60rem]">
              {data?.description || "Sem descrição definida para este projecto."}
            </p>
            <div className="mt-[1.5rem] grid gap-[1rem] sm:grid-cols-3">
              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1.2rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Criado</p>
                <p className="mt-[0.4rem] flex items-center gap-[0.5rem]">
                  <CalendarDays size={16} />
                  {formatDate(new Date(data?.createdAt || new Date()), true, true)}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1.2rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Entrega</p>
                <p className="mt-[0.4rem] flex items-center gap-[0.5rem]">
                  <Flag size={16} />
                  {formatDate(new Date(data?.endDate || new Date()), true, true)}
                </p>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1.2rem]">
                <p className="text-[1.2rem] text-secondary-text-color">Criador</p>
                <p className="mt-[0.4rem] flex items-center gap-[0.5rem]">
                  <UserRound size={16} />
                  {data?.createdBy?.name || "—"}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-3xl p-[2rem]">
            <div className="flex items-center justify-between">
              <p className="text-[1.3rem] text-secondary-text-color">Progresso</p>
              <span className="text-[1.4rem] font-semibold text-main-text-color">
                {progress}%
              </span>
            </div>
            <div className="mt-[0.8rem] w-full h-[0.6rem] rounded-full bg-gray-100 overflow-hidden">
              <div
                className="h-full bg-main-color"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-[1.5rem] grid gap-[1rem]">
              <div className="flex items-center justify-between">
                <p className="text-[1.3rem] text-secondary-text-color">Tarefas</p>
                <span className="text-[1.6rem] font-semibold text-main-text-color">
                  {totalTasks}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-[1.3rem] text-secondary-text-color">Concluídas</p>
                <span className="text-[1.6rem] font-semibold text-main-text-color">
                  {doneTasks}
                </span>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-main-bg-color p-[1rem] flex items-center gap-[0.6rem]">
                <CheckCircle2 size={18} />
                <span className="text-[1.3rem] text-secondary-text-color">
                  {doneTasks} de {totalTasks} tarefas concluídas
                </span>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-[1rem]">
                <p className="text-[1.2rem] text-secondary-text-color">
                  Próximas entregas
                </p>
                <div className="mt-[0.8rem] flex flex-col gap-[0.6rem]">
                  {tasks
                    .filter((task) => task.status !== "done")
                    .slice()
                    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
                    .slice(0, 3)
                    .map((task) => (
                      <div
                        key={task.id}
                        className="flex items-center justify-between text-[1.2rem]"
                      >
                        <span className="text-main-text-color line-clamp-1">
                          {task.title}
                        </span>
                        <span className="text-secondary-text-color">
                          {formatDate(new Date(task.dueDate), true, true)}
                        </span>
                      </div>
                    ))}
                  {tasks.filter((task) => task.status !== "done").length === 0 && (
                    <span className="text-[1.2rem] text-secondary-text-color">
                      Sem entregas pendentes
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <ProjectDetailsNav
        view={view}
        onViewChange={setView}
        search={search}
        onSearch={setSearch}
        statusFilter={statusFilter}
        onStatusChange={setStatusFilter}
        priorityFilter={priorityFilter}
        onPriorityChange={setPriorityFilter}
        sort={sort}
        onSortChange={setSort}
        showFilters={showFilters}
        onToggleFilters={() => setShowFilters((s) => !s)}
      />
      <ProjectTasks
        view={view}
        search={search}
        statusFilter={statusFilter}
        priorityFilter={priorityFilter}
        sort={sort}
        page={page}
        limit={limit}
        onPageChange={setPage}
      />
      <Modal.Window id="create-project-taskform">
        <CreateProjectTaskForm />
      </Modal.Window>
    </Modal>
  );
}

export default ProjectDetailsPage;
