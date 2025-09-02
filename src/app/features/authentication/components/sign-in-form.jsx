import { useState } from "react";
import Form from "../ui/form";
import { toast } from "sonner";
import useSignIn from "../hooks/use-signin";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Input from "../../../shared/ui/input";

function SignInForm() {
  const navigate = useNavigate();
  const { signIn, isPending } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    const data = { email, password };
    if (!email || !password)
      return toast.error("Por favor preenche todos os campos");
    signIn(data);
  }
  return (
    <div className="p-[4rem] flex items-center h-full">
      <Form onSubmit={onSubmit}>
        <header className="flex flex-col gap-[0.5rem]">
          <h1 className="flex items-center sm:text-[2.4rem] relative">
            <img src="./logo.png" className="sm:w-[3.5rem] w-[2.5rem] h-auto" />
            TeoChat
          </h1>
          <h1 className="text-[2.4rem]">Iniciar Sessão</h1>
          <span className="text-secondary-text-color">
            Informe as tuas credenciais para começar a tua productividade
          </span>
        </header>
        <div className="flex flex-col my-[3rem] gap-[1.5rem]">
          <Input
            defaultValues="manasse@gmaill.com"
            value={email}
            setValue={setEmail}
            label="Endereço de Email"
            id="email"
          />
          <Input
            defaultValues="password123"
            value={password}
            setValue={setPassword}
            label="Palavra-passe"
            id="password"
          />
        </div>
        <div className="flex flex-col w-full">
          <button className="bg-gradient-to-b text-[1.4rem] flex items-center justify-center sm:text-[1.6rem] from-green-600 to-green-500 p-[1rem_2rem]  gap-[0.5rem] text-white hover:bg-green-700 rounded-full">
            {isPending ? <SpinnerMini /> : "Iniciar Sessão"}
          </button>
        </div>
        <div className="text-secondary-text-color mt-[2rem] flex justify-between">
          <p>Ainda não tem uma conta?</p>{" "}
          <span
            onClick={() => navigate("/sign-up")}
            className="text-blue-700 cursor-pointer"
          >
            Criar Conta
          </span>
        </div>
      </Form>
    </div>
  );
}

export default SignInForm;
