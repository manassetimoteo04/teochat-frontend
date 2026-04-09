import {
  ArrowLeft,
  Check,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
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
    {
      field: "name",
      title: "Nome do workspace",
      subtitle: "Este será o nome principal exibido para sua equipe.",
      placeholder: "ex: TeoChat Inc.",
      required: true,
      data: "",
    },
    {
      field: "industry",
      title: "Área de atuação",
      subtitle: "Ajude a personalizar o workspace para o seu negócio.",
      placeholder: "ex: Marketing, SaaS, Tecnologia",
      required: true,
      data: "",
    },
    {
      field: "description",
      title: "Descrição curta",
      subtitle: "Compartilhe o propósito do workspace em uma frase.",
      placeholder: "Breve descrição do que sua empresa faz.",
      required: true,
      data: "",
    },
    {
      field: "invitation",
      title: "Convidar membros",
      subtitle: "Opcional. Você pode convidar a equipe depois.",
      placeholder: "ex: ana@empresa.com, time@empresa.com",
      required: false,
      data: "",
    },
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
    case "SET_STEP":
      return {
        ...state,
        currentStep: action.step,
      };

    default:
      return state;
  }
}

function CreateCompanyForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { currentStep, steps } = state;
  const navigate = useNavigate();
  const { create, isPending } = useCreateCompany();
  const isReviewStep = currentStep === steps.length;
  const step = steps[currentStep];
  const totalSteps = steps.length + 1;
  const progress = Math.round(
    (Math.min(currentStep + 1, totalSteps) / totalSteps) * 100,
  );
  function handleChange(e) {
    dispatch({
      type: "UPDATE_FIELD",
      field: step.field,
      value: e.target.value,
    });
  }
  function handleNext(e) {
    e.preventDefault();
    if (!step?.data && step?.required)
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
    <div className="max-w-[110rem] rounded-[1.6rem] mt-[8rem] border border-main-border-color bg-main-bg-color-2 m-[0_auto] overflow-hidden shadow-[0_12px_30px_rgba(15,23,42,0.06)]">
      <header className="flex flex-col gap-[1.2rem] p-[2.4rem] border-b border-main-border-color bg-white">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-[2.4rem] font-semibold">Novo workspace</h3>
            <p className="text-[1.4rem] text-secondary-text-color">
              Configure os dados principais em poucos passos.
            </p>
          </div>

          <Button
            onClick={() => navigate(-1)}
            variation="secondary"
            className="bg-main-bg-color px-5 py-2 flex gap-[0.5rem] text-secondary-text-color rounded-full border border-main-border-color hover:border-main-color hover:text-main-color w-auto"
          >
            <ArrowLeft /> <p className="hidden md:flex">Voltar</p>
          </Button>
        </div>
        <div className="flex flex-col gap-[0.8rem]">
          <div className="flex items-center justify-between text-[1.2rem] text-secondary-text-color">
            <span>
              Passo {Math.min(currentStep + 1, totalSteps)} de {totalSteps}
            </span>
            <span>{progress}% concluído</span>
          </div>
          <div className="h-[0.6rem] w-full rounded-full bg-main-bg-color">
            <div
              className="h-full rounded-full bg-green-500 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[26rem_1fr]">
        <aside className="border-r border-main-border-color bg-main-bg-color px-[2rem] py-[2.4rem]">
          <p className="text-[1.2rem] font-semibold uppercase tracking-[0.18rem] text-secondary-text-color mb-[1.6rem]">
            Etapas
          </p>
          <div className="flex flex-col gap-[1.2rem]">
            {steps.map((item, index) => {
              const isDone = index < currentStep;
              const isActive = index === currentStep;
              return (
                <button
                  type="button"
                  key={item.field}
                  onClick={() =>
                    isDone ? dispatch({ type: "SET_STEP", step: index }) : null
                  }
                  className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition ${
                    isActive
                      ? "border-green-500 bg-white text-main-text-color"
                      : isDone
                        ? "border-main-border-color bg-white/60 text-secondary-text-color"
                        : "border-main-border-color bg-transparent text-secondary-text-color"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 items-center justify-center rounded-full border text-[1.2rem] font-semibold ${
                      isDone
                        ? "border-green-500 bg-green-500 text-white"
                        : isActive
                          ? "border-green-500 text-green-600"
                          : "border-main-border-color text-secondary-text-color"
                    }`}
                  >
                    {isDone ? <Check size={14} /> : index + 1}
                  </span>
                  <div>
                    <p className="text-[1.3rem] font-medium">{item.title}</p>
                    <p className="text-[1.2rem] text-secondary-text-color">
                      {item.required ? "Obrigatório" : "Opcional"}
                    </p>
                  </div>
                </button>
              );
            })}
            <div
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${
                isReviewStep
                  ? "border-green-500 bg-white text-main-text-color"
                  : "border-main-border-color text-secondary-text-color"
              }`}
            >
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-main-border-color text-[1.2rem] font-semibold">
                {steps.length + 1}
              </span>
              <div>
                <p className="text-[1.3rem] font-medium">Revisão</p>
                <p className="text-[1.2rem] text-secondary-text-color">
                  Confira tudo
                </p>
              </div>
            </div>
          </div>
        </aside>

        <form action="" className="p-[3rem]">
          {!isReviewStep && (
            <StepForm step={{ title: step.title }}>
              <p className="text-[1.4rem] text-secondary-text-color">
                {step.subtitle}
              </p>
              <div className="flex flex-col gap-[0.8rem] mt-[1.6rem]">
                <label
                  htmlFor={step.field}
                  className="text-[1.3rem] font-medium text-main-text-color"
                >
                  {step.title}
                </label>
                {step.field === "description" ? (
                  <textarea
                    id={step.field}
                    value={step.data}
                    onChange={handleChange}
                    maxLength={160}
                    rows={4}
                    className="p-[1.4rem] focus:outline-none !transition-none bg-white rounded-xl border border-main-border-color focus:border-green-500 resize-none"
                    placeholder={step.placeholder}
                  />
                ) : (
                  <input
                    id={step.field}
                    value={step.data}
                    onChange={handleChange}
                    className="p-[1.4rem] focus:outline-none !transition-none bg-white rounded-xl border border-main-border-color focus:border-green-500"
                    type="text"
                    placeholder={step.placeholder}
                  />
                )}
                {step.field === "description" && (
                  <div className="text-[1.2rem] text-secondary-text-color text-right">
                    {step.data.length}/160
                  </div>
                )}
              </div>
            </StepForm>
          )}

          {isReviewStep && (
            <StepForm step={{ title: "Revisar informações" }}>
              <p className="text-[1.3rem] text-secondary-text-color mb-[2rem]">
                Confirme se os dados abaixo estão corretos antes de finalizar.
              </p>
              <div className="bg-white border border-main-border-color rounded-[1.2rem] p-[2rem] space-y-[1.6rem]">
                <InfoRow label="Nome" value={steps[0].data} />
                <InfoRow label="Área de atuação" value={steps[1].data} />
                <InfoRow label="Descrição" value={steps[2].data} />
                <InfoRow label="Convites" value={steps[3].data} />
              </div>
            </StepForm>
          )}

          <div className="flex justify-end">
            <div className="items-center flex gap-[1.2rem] justify-end mt-[3rem]">
              {currentStep > 0 && (
                <Button onClick={handlePrev} variation="secondary">
                  <ChevronLeft /> Anterior
                </Button>
              )}
              {!isReviewStep && (
                <Button disabled={isPending} onClick={handleNext}>
                  Próximo <ChevronRight />
                </Button>
              )}
              {isReviewStep && (
                <Button disabled={isPending} onClick={onSubmit}>
                  {isPending && <SpinnerMini />} Finalizar
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
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
