import { useCallback, useReducer } from "react";
import Button from "../../../shared/ui/button";
import Heading from "../../../shared/ui/heading";
import Input from "../../../shared/ui/input";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useCreateProject } from "../hooks/use-create-project";

const initialState = {
  name: undefined,
  description: undefined,
  startDate: undefined,
  dueDate: undefined,
  priority: undefined,
  tags: undefined,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_VALUE":
      return { ...state, ...action.payload };
  }
}
function CreateUpdateProjectForm({ onCloseModal }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { create, isPending } = useCreateProject();
  const handleChange = useCallback((field, value) => {
    dispatch({ type: "SET_VALUE", payload: { [field]: value } });
  }, []);
  const { description, dueDate, priority, name } = state;

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      create({ ...state }, { onSuccess: onCloseModal });
    },
    [create, onCloseModal, state],
  );
  return (
    <div className="p-[2rem] min-w-[35rem]">
      <header className="mb-[2rem]">
        <Heading as="h2">Criar Novo Projecto</Heading>
        <span className="text-secondary-text-color">
          Preencha o formulário para criar novo projecto
        </span>
      </header>
      <div className="flex flex-col gap-[1rem]">
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-[1.2rem]">
            <Input
              value={name}
              setValue={(val) => handleChange("name", val)}
              label="Título da Projecto"
            />

            <Input
              value={description}
              setValue={(val) => handleChange("description", val)}
              label="Descrição"
            />

            <Input
              value={dueDate}
              setValue={(val) => handleChange("dueDate", val)}
              label="Data de entrega"
              type="date"
            />

            <Input
              value={priority}
              setValue={(val) => handleChange("priority", val)}
              label="Prioridade (low, medium, high)"
            />
          </div>

          <div className="mt-[2rem]">
            <Button onClick={handleSubmit}>
              {isPending ? <SpinnerMini /> : "Criar Tarefa"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUpdateProjectForm;
