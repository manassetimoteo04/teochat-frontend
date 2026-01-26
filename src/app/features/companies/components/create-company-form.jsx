import { ArrowLeft, Check, ChevronLeft, ChevronRight } from "lucide-react";
import StepForm from "../ui/step-form";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useCreateCompany } from "../hooks/use-create-company";
import { useReducer } from "react";

const initialState = {
  currentStep: 0,
  steps: [
    { field: "name", title: "Diz qual é o nome da tua empresa?", data: "" },
    {
      field: "industry",
      title: "Qual é a área de actuação da tua empresa?",
      data: "",
    },
    {
      field: "description",
      title: "Descreve um pouco mais a tua empresa",
      data: "",
    },
    { field: "invitation", title: "Convides Membros a Participare", data: "" },
  ],
};
function reducer(state, action) {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        steps: state.steps.map((step) =>
          step.field === action.field ? { ...step, data: action.value } : step,
        ),
      };

    case "NEXT_STEP":
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.steps.length),
      };

    case "PREVIOUS_STEP":
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

function CreateCompanyForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentStep, steps } = state;
  const navigate = useNavigate();
  const { create, isPending } = useCreateCompany();
  const step = steps[currentStep];
  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: step.field,
      value: e.target.value,
    });
  }
  function handleNext(e) {
    e.preventDefault();
    if (!step.data)
      return toast.warning(
        "Por favor preenche o campo antes de ir ao próximo passo",
      );
    dispatch({ type: "NEXT_STEP" });
  }
  function handlePrev(e) {
    e.preventDefault();
    dispatch({ type: "PREVIOUS_STEP" });
  }
  function onSubmit(e) {
    e.preventDefault();
    const newCompany = {};
    steps.forEach((_, index) => {
      newCompany[steps[index].field] = steps[index].data;
    });
    create(newCompany);
  }
  return (
    <div className="max-w-[100rem] rounded-2xl mt-[8rem]  border-main-border-color bg-main-bg-color-2 m-[0_auto]">
      <header className="flex gap-[1rem] flex-col justify-between p-[2rem]   border-main-border-color">
        <div className="flex justify-between items-center ">
          <h3 className="text-[2.4rem]  font-semibold">Criar Empresa</h3>

          <div>
            <Button
              onClick={() => navigate(-1)}
              variation="secondary"
              className="bg-main-bg-color p-[0.8rem_2rem] flex gap-[0.5rem] text-secondary-text-color disabled:opacity-50  rounded-full  mt-3 border border-main-border-color hover:border-main-color hover:text-main-color"
            >
              <ArrowLeft /> <p className="hidden md:flex">Voltar</p>
            </Button>
          </div>
        </div>
        <div className="flex justify-between my-[2rem]">
          {steps.map((_, i) => (
            <div
              className={`${
                i < currentStep ? "!bg-blue-500 after:!bg-blue-500" : ""
              } bg-gray-200 w-full h-[0.3rem] md:h-[0.8rem] rounded-2xl after:z-10 relative after:absolute after:right-[-0.5rem]  after:top-1/2 after:-translate-y-1/2 after:w-[3rem] after:h-[3rem] after:bg-gray-200 after:rounded-full `}
            >
              {i < currentStep && (
                <span className="absolute  z-20 text-white right-[-0rem]  top-1/2 -translate-y-1/2">
                  <Check size={20} />
                </span>
              )}
            </div>
          ))}
        </div>
      </header>

      <form action="" className="p-[3rem]">
        {currentStep === 0 && (
          <StepForm step={steps[currentStep]}>
            <div>
              <input
                id={steps[currentStep].field}
                defaultValue={steps[currentStep].data}
                onChange={handleChange}
                className="p-[1.4rem] focus:outline-none !transition-none bg-main-bg-color rounded-xl border border-main-border-color"
                type="text"
                placeholder="ex: TeoChat .inc"
              />
            </div>
          </StepForm>
        )}{" "}
        {currentStep === 1 && (
          <StepForm step={steps[currentStep]}>
            <div>
              <input
                id={steps[currentStep].field}
                defaultValue={steps[currentStep].data}
                onChange={handleChange}
                className="p-[1.4rem] focus:outline-none !transition-none bg-main-bg-color rounded-xl border border-main-border-color"
                type="text"
                placeholder="ex: Marketing, Programação Web, Designing..."
              />
            </div>
          </StepForm>
        )}{" "}
        {currentStep === 2 && (
          <StepForm step={steps[currentStep]}>
            <div>
              <input
                id={steps[currentStep].field}
                defaultValue={steps[currentStep].data}
                onChange={handleChange}
                className="p-[1.4rem] focus:outline-none !transition-none bg-main-bg-color rounded-xl border border-main-border-color"
                type="text"
                placeholder="Breve Descrição"
              />
            </div>
          </StepForm>
        )}{" "}
        {currentStep === 3 && (
          <StepForm step={steps[currentStep]}>
            <div>
              <input
                id={steps[currentStep].field}
                defaultValue={steps[currentStep].data}
                onChange={handleChange}
                className="p-[1.4rem] focus:outline-none !transition-none bg-main-bg-color rounded-xl border border-main-border-color"
                type="text"
                placeholder="ex: example@me.com, joedue@io.com, johnsmith@email.com"
              />
            </div>
          </StepForm>
        )}
        {currentStep === 4 && (
          <StepForm step={{ title: "Visualizar Informações" }}>
            <p className="text-[1.3rem] text-gray-500 mb-[2rem]">
              Confirma se as informações abaixo estão correctas antes de
              finalizar.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-[1.6rem] p-[2rem] space-y-[1.6rem]">
              <InfoRow label="Nome" value={steps[0].data} />
              <InfoRow label="Área de actuação" value={steps[1].data} />
              <InfoRow label="Descrição" value={steps[2].data} />
              <InfoRow label="Convites para" value={steps[3].data} />
            </div>
          </StepForm>
        )}
        <div className="flex justify-end">
          <div className=" items-center flex  gap-[2rem] justify-end mt-[3rem]">
            {currentStep > 0 && (
              <Button onClick={handlePrev} variation="secondary">
                <ChevronLeft /> Anterior{" "}
              </Button>
            )}
            {steps.length > currentStep && (
              <Button disabled={isPending} onClick={handleNext}>
                Próximo <ChevronRight />
              </Button>
            )}
            {steps.length <= currentStep && (
              <Button disabled={isPending} onClick={onSubmit}>
                {isPending && <SpinnerMini />} Finalizar
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

export default CreateCompanyForm;

function InfoRow({ label, value }) {
  return (
    <div className="flex justify-between gap-[2rem]">
      <span className="text-[1.2rem] text-gray-500">{label}</span>

      <span className="text-[1.4rem] font-medium text-gray-900 text-right max-w-[24rem]">
        {value || "—"}
      </span>
    </div>
  );
}
