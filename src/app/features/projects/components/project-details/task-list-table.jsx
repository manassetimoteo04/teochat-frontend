import Tag from "../../../../shared/ui/tag";
import { formatDate } from "../../../../shared/utils/helpers";
import Modal from "../../../../shared/ui/modal";
import { TaskDetails } from "../task-details";

function priorityTagType(priority) {
  if (priority === "high") return "canceled";
  if (priority === "medium") return "active";
  return "pending";
}

function statusTagType(status) {
  if (status === "done") return "done";
  if (status === "in_progress") return "active";
  return "pending";
}

import Pagination from "../../../../shared/ui/pagination";

export default function TaskListTable({
  tasks,
  page,
  totalPages,
  onPageChange,
  isLoading,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
      <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_1fr] gap-[1rem] bg-main-bg-color px-[1.5rem] py-[1rem] text-[1.2rem] text-secondary-text-color">
        <span>Tarefa</span>
        <span>Status</span>
        <span>Prioridade</span>
        <span>Entrega</span>
      </div>
      <div className="divide-y divide-gray-100">
        {tasks.map((task) => (
          <div key={task.id}>
            <Modal.Open id={`task-details-${task.id}`}>
              <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-[0.8rem] px-[1.5rem] py-[1.2rem] cursor-pointer hover:bg-main-bg-color transition-colors">
                <div>
                  <p className="text-main-text-color font-medium">{task.title}</p>
                  <p className="text-[1.2rem] text-secondary-text-color line-clamp-2">
                    {task.description}
                  </p>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <span className="text-[1.2rem] text-secondary-text-color md:hidden">
                    Status:
                  </span>
                  <Tag type={statusTagType(task.status)}>{task.status}</Tag>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <span className="text-[1.2rem] text-secondary-text-color md:hidden">
                    Prioridade:
                  </span>
                  <Tag type={priorityTagType(task.priority)}>{task.priority}</Tag>
                </div>
                <div className="flex items-center gap-[0.5rem]">
                  <span className="text-[1.2rem] text-secondary-text-color md:hidden">
                    Entrega:
                  </span>
                  <span className="text-[1.2rem] text-secondary-text-color">
                    {formatDate(new Date(task.dueDate), true, true)}
                  </span>
                </div>
              </div>
            </Modal.Open>
            <Modal.Window id={`task-details-${task.id}`} buttonClose={false}>
              <TaskDetails task={task} />
            </Modal.Window>
          </div>
        ))}
        {tasks.length < 1 && (
          <div className="p-[2rem] text-secondary-text-color">
            Nenhuma tarefa encontrada com estes filtros.
          </div>
        )}
      </div>
      <div className="px-[1.5rem]">
        <Pagination
          page={page}
          totalPages={totalPages}
          onPageChange={onPageChange}
          isLoading={isLoading}
          className="justify-end"
        />
      </div>
    </div>
  );
}
