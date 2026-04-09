import {
  CalendarCheck,
  CalendarFold,
  ChartBar,
  Check,
  CheckCheck,
  CircleDot,
  Loader,
  MapPin,
  PencilLine,
  Plus,
  Text,
  Trash2,
  User,
  UserCheck,
  X,
} from "lucide-react";
import { formatDate, rewriteStatus } from "../../../../shared/utils/helpers";
import Tag from "../../../../shared/ui/tag";
import Heading from "../../../../shared/ui/heading";
import { TaskAttachments } from "./task-attachments";
import { useDeleteProjectTask } from "../../hooks/use-delete-project-task";
import { useCallback, useReducer, useState } from "react";
import clsx from "clsx";
import Button from "../../../../shared/ui/button";
import ButtonIcon from "../../../../shared/ui/button-icon";
import SelectTaskAssigned from "../create-project-task-form/select-task-assigned";
import { useUpdateProjectTask } from "../../hooks/use-update-project-task";

const initialTaskState = {
  title: undefined,
  description: undefined,
  dueDate: undefined,
  priority: "low",
  projectId: undefined,
  assignedTo: undefined,
};

function taskReducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, ...action.payload };
    case "RESET":
      return initialTaskState;
    default:
      return state;
  }
}

export function TaskDetails({ task, onCloseModal }) {
  const { status, createdAt, title, description, id } = task;
  const [state, dispatch] = useReducer(taskReducer, {
    ...task,
  });
  const { deleteTask } = useDeleteProjectTask();
  const { update, isPending: isUpdating } = useUpdateProjectTask();
  const handleChange = useCallback((field, value) => {
    dispatch({ type: "SET_VALUE", payload: { [field]: value } });
  }, []);
  const [showList, setShowList] = useState(false);
  const [isUpdateSession, setIsUpdateSession] = useState(false);
  const typeStatus = {
    todo: "pending",
    in_progress: "active",
    done: "done",
  };

  const handleSetAssigned = useCallback(
    (selected) => {
      handleChange("assignedTo", selected);
      setShowList(false);
    },
    [handleChange],
  );
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

  const PRIORITIES_UPDATE = [
    {
      value: "low",
      label: "Baixa",
      type: "pending",
    },
    {
      value: "medium",
      label: "Média",
      type: "active",
    },
    {
      value: "high",
      label: "Alta",
      type: "canceled",
    },
  ];

  function handleUpdate() {
    const { id, assignedTo, ...rest } = state;

    const data = {
      id,
      ...rest,
      assignedTo: assignedTo?.id || undefined,
    };
    update(
      { id, ...data },
      {
        onSuccess: () => {
          onCloseModal();
        },
      },
    );
  }
  function handleCancelUpdate() {
    setIsUpdateSession(false);
    dispatch({ type: "RESET" });
    dispatch({ type: "SET_VALUE", payload: { ...task } });
  }
  return (
    <div className="p-[2rem] max-w-[50rem] min-w-[55rem] flex flex-col gap-[2rem]">
      <div className="flex flex-col gap-[1rem] ">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-[1rem]">
            <span className="flex items-center  gap-[0.5rem] text-secondary-text-color">
              <CalendarFold size={20} /> Tarefa
            </span>
            &mdash;
            <Tag type={typeStatus[status]}>{rewriteStatus(status)}</Tag>
          </div>
          <div className="flex items-center gap-[2rem]">
            {!isUpdateSession && (
              <span
                onClick={() => setIsUpdateSession(true)}
                className="cursor-pointer text-secondary-text-color"
              >
                <PencilLine size={20} />
              </span>
            )}
            {isUpdateSession && (
              <div className="flex items-center gap-[0.5rem]">
                <Button onClick={handleUpdate} className="!w-auto px-[1.2rem]">
                  {!isUpdating ? <Check /> : <Loader className="animate-spin" />}
                </Button>
                <Button
                  variation="secondary"
                  onClick={handleCancelUpdate}
                  className="!w-auto px-[1.2rem]"
                >
                  <X />
                </Button>
              </div>
            )}
            <span
              onClick={() => {
                deleteTask(id, { onSuccess: () => onCloseModal() });
              }}
              className="cursor-pointer text-secondary-text-color"
            >
              <Trash2 size={20} />
            </span>
            <span
              onClick={() => onCloseModal()}
              className="cursor-pointer text-secondary-text-color"
            >
              <X />
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-secondary-text-color">
            Criado {formatDate(new Date(createdAt))}
          </span>
          {!isUpdateSession && <Heading as="h2">{title}</Heading>}
          {isUpdateSession && (
            <input
              onChange={(e) => handleChange("title", e.target.value)}
              defaultValue={title}
              type="text"
              className=" border border-main-color focus:outline-none  rounded-2xl items-center gap-[1rem]  p-[1.5rem]"
            />
          )}
        </div>
      </div>
      <div>
        <div className="flex flex-col gap-[1rem]">
          {!isUpdateSession ? (
            <div className=" border border-gray-200  rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
              <span>{description}</span>
            </div>
          ) : (
            <textarea
              onChange={(e) => handleChange("description", e.target.value)}
              defaultValue={description}
              rows={1}
              style={{ resize: "none" }}
              className="border border-main-color focus:outline-none    rounded-2xl items-center gap-[1rem]  p-[1.5rem]"
            />
          )}
          <div
            className={clsx(
              "grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]",
              isUpdateSession && "border-main-color",
            )}
          >
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <CircleDot size={20} />
              Status
            </span>
            {!isUpdateSession && <span>{rewriteStatus(status)}</span>}
            {isUpdateSession && (
              <div className="flex gap-[0.6rem] flex-wrap">
                {Object.keys(typeStatus).map((key) => (
                  <Tag
                    onClick={() => handleChange("status", key)}
                    className={`cursor-pointer border ${
                      key === state.status ? "bg-blue-100 text-blue-600 border-blue-100" : ""
                    }`}
                    type={key === state.status ? "pending" : "settled"}
                    key={key}
                  >
                    {rewriteStatus(key)}
                  </Tag>
                ))}
              </div>
            )}
          </div>
          <div
            className={clsx(
              "grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]",
              isUpdateSession && "border-main-color",
            )}
          >
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <ChartBar size={20} />
              Prioridade
            </span>
            <span>
              {" "}
              {!isUpdateSession && (
                <Tag type={PRIORITIES[task.priority].type}>
                  {PRIORITIES[task.priority].label}
                </Tag>
              )}
              {isUpdateSession && (
                <div className="flex gap-[1rem]">
                  {PRIORITIES_UPDATE.map((el) => (
                    <Tag
                      onClick={() => handleChange("priority", el.value)}
                      className="cursor-pointer border"
                      type={el.value === state.priority ? el.type : "settled"}
                      key={el.value}
                    >
                      {el.label}
                    </Tag>
                  ))}
                </div>
              )}
            </span>
          </div>{" "}
          <div className="grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]">
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <User size={20} />
              Criado por
            </span>
            <div className="flex items-center gap-[1rem]">
              <img
                src={task.createdBy.avatar || "/default-user.jpg"}
                className="w-[2.4rem] h-[2.4rem] rounded-full"
                alt=""
              />
              <p className="">{task.createdBy.name}</p>
            </div>
          </div>
          <div
            className={clsx(
              "grid grid-cols-[12rem_1fr] border border-gray-200 bg-gray-50 rounded-2xl items-center gap-[1rem]  p-[1.5rem]",
              isUpdateSession && "border-main-color",
            )}
          >
            <span className="text-secondary-text-color items-center flex gap-[1rem]">
              <UserCheck size={20} />
              Designado
            </span>
            <div className="flex items-center relative justify-between">
              <div className="flex items-center gap-[1rem]">
                <img
                  src={state.assignedTo?.avatar || "/default-user.jpg"}
                  className="w-[2.4rem] h-[2.4rem] rounded-full"
                  alt=""
                />
                <p className="">{state.assignedTo?.name || "Nenhum"}</p>
              </div>
              {isUpdateSession && (
                <Button
                  onClick={() => setShowList(true)}
                  className="!w-[6rem]"
                  variation="secondary"
                >
                  <Plus />
                </Button>
              )}

              {showList && (
                <SelectTaskAssigned
                  handleSetAssigned={handleSetAssigned}
                  setShowList={setShowList}
                />
              )}
            </div>
          </div>
        </div>
      </div>
      <TaskAttachments />
    </div>
  );
}
