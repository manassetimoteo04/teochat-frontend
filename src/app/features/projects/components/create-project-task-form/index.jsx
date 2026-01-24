import { useCallback, useReducer, useState } from "react";
import Input from "../../../../shared/ui/input";
import Tag from "../../../../shared/ui/tag";
import Button from "../../../../shared/ui/button";
import { Loader, User } from "lucide-react";
import { useParams } from "react-router-dom";
import { useCreateProjectTask } from "../../hooks/use-create-project-task";
import SelectTaskAssigned from "./select-task-assigned";

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

const PRIORITIES = [
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
export function CreateProjectTaskForm({ onCloseModal }) {
  const { projectId } = useParams();
  const [assignedTo, setAssignedTo] = useState(null);
  const [showList, setShowList] = useState(false);
  const [state, dispatch] = useReducer(taskReducer, {
    ...initialTaskState,
    projectId,
  });

  const { create, isPending } = useCreateProjectTask();

  const handleChange = useCallback((field, value) => {
    dispatch({ type: "SET_VALUE", payload: { [field]: value } });
  }, []);

  const { title, description, dueDate, priority } = state;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      create(
        { ...state, assignedTo: assignedTo.id },
        {
          onSuccess: () => {
            dispatch({ type: "RESET" });
            onCloseModal?.();
          },
        },
      );
    },
    [state, create, onCloseModal, assignedTo],
  );

  const handleSetAssigned = useCallback((selected) => {
    setAssignedTo(selected);
    setShowList(false);
  }, []);

  return (
    <div className=" min-w-[50rem]">
      <header className="border-b border-gray-200 p-[2rem]">
        <h2 className="text-[2rem] font-semibold">Adicionar Tarefa Nova</h2>
      </header>

      <div className="p-[2rem]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-[1.5rem]">
          <Input
            value={title}
            setValue={(val) => handleChange("title", val)}
            label="Título da Tarefa"
          />
          <Input
            value={dueDate}
            type="date"
            setValue={(val) => handleChange("dueDate", val)}
            label="Selecionar Data Limite"
          />
          <textarea
            value={description || ""}
            onChange={(e) => handleChange("description", e.target.value)}
            placeholder="Descrição"
            minLength={10}
            className="p-[1rem_1.5rem] rounded-lg focus:outline-none !transition-none bottom-[-1rem] bg-transparent border border-main-border-color  resize-none  w-full"
          />

          <div className="flex gap-[1rem]">
            {PRIORITIES.map((el) => (
              <Tag
                onClick={() => handleChange("priority", el.value)}
                className="cursor-pointer border"
                type={el.value === priority ? el.type : "settled"}
                key={el.value}
              >
                {el.label}
              </Tag>
            ))}
          </div>

          <div className="flex items-center relative  justify-between">
            <span>Designar Para</span>
            {!assignedTo && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  setShowList(true);
                }}
                className="!w-auto"
                variation="dashed"
              >
                <User size={16} /> Designar
              </Button>
            )}
            {assignedTo && (
              <div
                onClick={() => setShowList(true)}
                className={
                  "flex cursor-pointer hover:bg-gray-50 rounded-2xl items-center gap-[0.5rem] p-[1rem]  "
                }
              >
                <img
                  src={assignedTo.avatar || "/default-user.jpg"}
                  className="w-[3rem] h-[3rem] border rounded-full"
                  alt=""
                />
                <div>
                  <p className="text-[1.6rem]">{assignedTo.name}</p>
                </div>
              </div>
            )}
            {showList && (
              <SelectTaskAssigned
                handleSetAssigned={handleSetAssigned}
                setShowList={setShowList}
              />
            )}
          </div>

          <Button
            disabled={isPending}
            className="bg-blue-500 text-white p-2 rounded disabled:opacity-50"
          >
            {isPending && <Loader className="animate-spin" />} Criar Tarefa
          </Button>
        </form>
      </div>
    </div>
  );
}
