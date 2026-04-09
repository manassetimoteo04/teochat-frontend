import { useCallback, useEffect, useReducer } from "react";
import Button from "../../../shared/ui/button";
import Heading from "../../../shared/ui/heading";
import Input from "../../../shared/ui/input";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useCreateProject } from "../hooks/use-create-project";
import { useUpdateProject } from "../hooks/use-update-project";
import { useGetProjectById } from "../hooks/use-get-project-by-id";
import { useParams } from "react-router-dom";

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
function CreateUpdateProjectForm({ onCloseModal, project, projectId }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { create, isPending } = useCreateProject();
  const { teamId } = useParams();
  const { update, isPending: isUpdating } = useUpdateProject();
  const handleChange = useCallback((field, value) => {
    dispatch({ type: "SET_VALUE", payload: { [field]: value } });
  }, []);
  const { description, dueDate, priority, name } = state;
  const isUpdate = Boolean(projectId || project?.id);
  const { data: projectDetails } = useGetProjectById(projectId, {
    enabled: isUpdate && !project?.description,
  });
  const dataForForm = projectDetails || project || {};

  useEffect(() => {
    if (!dataForForm?.id && !dataForForm?.name) return;
    dispatch({
      type: "SET_VALUE",
      payload: {
        name: dataForForm.name || "",
        description: dataForForm.description || "",
        dueDate:
          dataForForm.endDate?.split("T")[0] ||
          dataForForm.dueDate?.split?.("T")?.[0] ||
          "",
        priority: dataForForm.priority || "",
        startDate: dataForForm.startDate?.split("T")[0] || "",
      },
    });
  }, [dataForForm]);

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      if (isUpdate) {
        update(
          { projectId: projectId || project?.id, ...state, teamId },
          { onSuccess: onCloseModal },
        );
      } else {
        create({ ...state }, { onSuccess: onCloseModal });
      }
    },
    [create, isUpdate, onCloseModal, project?.id, projectId, state, update],
  );
  return (
    <div className="p-[2rem] min-w-[35rem]">
      <header className="mb-[2rem]">
        <Heading as="h2">
          {isUpdate ? "Actualizar Projecto" : "Criar Novo Projecto"}
        </Heading>
        <span className="text-secondary-text-color">
          {isUpdate
            ? "Actualize as informações do projecto"
            : "Preencha o formulário para criar novo projecto"}
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
              {isPending || isUpdating ? (
                <SpinnerMini />
              ) : isUpdate ? (
                "Actualizar Projecto"
              ) : (
                "Criar Projecto"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUpdateProjectForm;
