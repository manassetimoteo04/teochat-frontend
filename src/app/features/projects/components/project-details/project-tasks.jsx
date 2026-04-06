import Modal from "../../../../shared/ui/modal";
import Spinner from "../../../../shared/ui/Spinner";
import { useGetTasksByProjectId } from "../../hooks/use-get-tasks-by-project-id";
import ProjectTaskCol from "../project-task-col";
import { useMemo } from "react";
import TaskListTable from "./task-list-table";

function sortTasks(list, sort) {
  const copy = [...list];
  if (sort === "dueDate_asc") {
    return copy.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }
  if (sort === "dueDate_desc") {
    return copy.sort((a, b) => new Date(b.dueDate) - new Date(a.dueDate));
  }
  if (sort === "createdAt_desc") {
    return copy.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }
  return copy;
}

export default function ProjectTasks({
  view = "board",
  search = "",
  statusFilter = "all",
  priorityFilter = "all",
  sort = "createdAt_desc",
  page = 1,
  limit = 10,
  onPageChange,
}) {
  const { data, isPending } = useGetTasksByProjectId({
    query: search,
    status: statusFilter !== "all" ? statusFilter : undefined,
    priority: priorityFilter !== "all" ? priorityFilter : undefined,
    sort,
  });
  const normalizedSearch = search?.toLowerCase();
  const filtered = useMemo(() => {
    const list = data || [];
    return list.filter((task) => {
      const matchesSearch = !normalizedSearch
        ? true
        : `${task.title || ""} ${task.description || ""}`
            .toLowerCase()
            .includes(normalizedSearch);
      const matchesStatus =
        statusFilter === "all" ? true : task.status === statusFilter;
      const matchesPriority =
        priorityFilter === "all" ? true : task.priority === priorityFilter;
      return matchesSearch && matchesStatus && matchesPriority;
    });
  }, [data, normalizedSearch, priorityFilter, statusFilter]);
  const ordered = useMemo(() => sortTasks(filtered, sort), [filtered, sort]);
  const paged = useMemo(() => {
    const start = (page - 1) * limit;
    return ordered.slice(start, start + limit);
  }, [limit, ordered, page]);

  return (
    <Modal>
      {isPending && <Spinner />}
      {!isPending && (
        <>
      {view === "board" && (
        <div className="w-full overflow-x-auto flex gap-[1.5rem] p-[2rem] items-stretch bg-[linear-gradient(180deg,rgba(249,250,251,0.9),rgba(255,255,255,1))]">
          <ProjectTaskCol
            data={ordered.filter((el) => el.status === "todo")}
            type="Pendentes"
            total={23}
            color="#E0ECFF"
          />
          <ProjectTaskCol
            data={ordered.filter((el) => el.status === "in_progress")}
            type="Em Progresso"
            total={23}
            color="#FFF3C4"
          />
          <ProjectTaskCol
            data={ordered.filter((el) => el.status === "done")}
            type="Concluídos"
            total={23}
            color="#E7F7EC"
          />
        </div>
      )}
      {view === "list" && (
        <div className="p-[2rem]">
          <TaskListTable
            tasks={paged}
            page={page}
            totalPages={Math.max(1, Math.ceil(ordered.length / limit))}
            onPageChange={onPageChange}
            isLoading={isPending}
          />
        </div>
      )}
        </>
      )}
    </Modal>
  );
}
