import { User } from "lucide-react";
import Button from "../../../../shared/ui/button";
import Tag from "../../../../shared/ui/tag";
import { formatDate } from "../../../../shared/utils/helpers";
import Modal from "../../../../shared/ui/modal";
import { TaskDetails } from "../task-details";

export default function TaskCard({ task }) {
  const PRIORITIES = {
    low: {
      value: "low",
      label: "Baixa",
      type: "pending",
    },
    medium: {
      value: "medium",
      label: "Média",
      type: "active",
    },
    high: {
      value: "high",
      label: "Alta",
      type: "canceled",
    },
  };

  return (
    <>
      <Modal.Open id={`task-details-${task.id}`}>
        <div className="bg-white rounded-xl shadow-sm  cursor-pointer p-[2rem] flex flex-col gap-[0.5rem] items-start">
          <div className="flex justify-between w-full items-center">
            <Tag type={PRIORITIES[task.priority].type}>
              {PRIORITIES[task.priority].label}
            </Tag>

            <span className="text-[1.2rem] text-gray-500">
              {formatDate(new Date(task.dueDate), true, true)}
            </span>
          </div>
          <h3 className="font-semibold">{task.title}</h3>
          <p className="text-[1.2rem] text-gray-500">{task.description}</p>
          <footer className="relative">
            {task.assignedTo ? (
              <div className="flex items-center gap-[0.3rem]">
                <img
                  src={task.assignedTo.avatar || "/default-user.jpg"}
                  className="w-[2rem] h-[2rem] border rounded-full"
                  alt=""
                />
                <div>
                  <p className="text-[1rem]">{task.assignedTo.name}</p>
                </div>
              </div>
            ) : (
              <Button
                onClick={(e) => e.stopPropagation()}
                size="sm"
                className="!w-auto p-[0.3rem]"
                variation="dashed"
              >
                <User size={16} /> Designar
              </Button>
            )}
          </footer>
        </div>
      </Modal.Open>
      <Modal.Window id={`task-details-${task.id}`} buttonClose={false}>
        <TaskDetails task={task} />
      </Modal.Window>
    </>
  );
}
