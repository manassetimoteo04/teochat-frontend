import { Grid2X2, List, SlidersHorizontal } from "lucide-react";
import InputSearch from "../../../../shared/ui/input-search";
import Tag from "../../../../shared/ui/tag";

export default function ProjectDetailsNav({
  view,
  onViewChange,
  search,
  onSearch,
  statusFilter,
  onStatusChange,
  priorityFilter,
  onPriorityChange,
  sort,
  onSortChange,
  showFilters,
  onToggleFilters,
}) {
  return (
    <div className="border-b-gray-200 border-b p-[2rem] flex flex-col gap-[1.2rem] bg-white">
      <div className="flex flex-wrap items-center justify-between gap-[1rem]">
        <div className="inline-flex items-center rounded-full bg-main-bg-color p-[0.3rem] border border-gray-200">
          <button
            onClick={() => onViewChange("board")}
            className={`flex items-center gap-[0.4rem] px-[1.2rem] py-[0.6rem] rounded-full text-[1.3rem] ${
              view === "board"
                ? "bg-white text-main-text-color shadow-sm"
                : "text-secondary-text-color hover:text-main-text-color"
            }`}
          >
            <Grid2X2 size={16} /> Cards
          </button>
          <button
            onClick={() => onViewChange("list")}
            className={`flex items-center gap-[0.4rem] px-[1.2rem] py-[0.6rem] rounded-full text-[1.3rem] ${
              view === "list"
                ? "bg-white text-main-text-color shadow-sm"
                : "text-secondary-text-color hover:text-main-text-color"
            }`}
          >
            <List size={16} /> Lista
          </button>
        </div>
        <button
          onClick={onToggleFilters}
          className="flex items-center gap-[0.4rem] px-[1rem] py-[0.6rem] rounded-full border border-gray-200 text-secondary-text-color hover:text-main-text-color bg-white"
        >
          <SlidersHorizontal size={16} /> Filtros
        </button>
      </div>

      <div className="grid gap-[1rem] lg:grid-cols-[1.2fr_1fr] items-center">
        <div className="w-full">
          <InputSearch value={search} setValue={onSearch} />
        </div>
        <div className="flex flex-wrap gap-[0.5rem] justify-start lg:justify-end">
          <Tag
            type={statusFilter === "all" ? "pending" : "settled"}
            onClick={() => onStatusChange("all")}
            className={`cursor-pointer border ${
              statusFilter === "all" ? "bg-blue-100 text-blue-600 border-blue-100" : ""
            }`}
          >
            Todos
          </Tag>
          <Tag
            type={statusFilter === "todo" ? "pending" : "settled"}
            onClick={() => onStatusChange("todo")}
            className={`cursor-pointer border ${
              statusFilter === "todo" ? "bg-blue-100 text-blue-600 border-blue-100" : ""
            }`}
          >
            Pendentes
          </Tag>
          <Tag
            type={statusFilter === "in_progress" ? "pending" : "settled"}
            onClick={() => onStatusChange("in_progress")}
            className={`cursor-pointer border ${
              statusFilter === "in_progress"
                ? "bg-blue-100 text-blue-600 border-blue-100"
                : ""
            }`}
          >
            Em Progresso
          </Tag>
          <Tag
            type={statusFilter === "done" ? "pending" : "settled"}
            onClick={() => onStatusChange("done")}
            className={`cursor-pointer border ${
              statusFilter === "done" ? "bg-blue-100 text-blue-600 border-blue-100" : ""
            }`}
          >
            Concluídas
          </Tag>
        </div>
      </div>

      {showFilters && (
        <div className="flex flex-wrap gap-[1rem] items-center">
          <div className="flex gap-[0.6rem] items-center">
            <span className="text-[1.2rem] text-secondary-text-color">Prioridade</span>
            <div className="flex gap-[0.5rem]">
              {["all", "low", "medium", "high"].map((priority) => (
                <Tag
                  key={priority}
                  type={priorityFilter === priority ? "pending" : "settled"}
                  onClick={() => onPriorityChange(priority)}
                  className={`cursor-pointer border ${
                    priorityFilter === priority
                      ? "bg-blue-100 text-blue-600 border-blue-100"
                      : ""
                  }`}
                >
                  {priority === "all" ? "Todas" : priority}
                </Tag>
              ))}
            </div>
          </div>
          <div className="flex gap-[0.6rem] items-center">
            <span className="text-[1.2rem] text-secondary-text-color">Ordenar</span>
            <div className="flex gap-[0.5rem]">
              {[
                { key: "dueDate_asc", label: "Entrega ↑" },
                { key: "dueDate_desc", label: "Entrega ↓" },
                { key: "createdAt_desc", label: "Recente" },
              ].map((option) => (
                <Tag
                  key={option.key}
                  type={sort === option.key ? "pending" : "settled"}
                  onClick={() => onSortChange(option.key)}
                  className={`cursor-pointer border ${
                    sort === option.key ? "bg-blue-100 text-blue-600 border-blue-100" : ""
                  }`}
                >
                  {option.label}
                </Tag>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
