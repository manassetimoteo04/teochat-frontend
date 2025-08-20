import { useState } from "react";
import { useSignUp } from "../hooks/use-signup";
import AuthInput from "../ui/auth-input";
import Form from "../ui/form";
import { useNavigate } from "react-router-dom";

function SignUpForm() {
  const { signUp, isPending } = useSignUp();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  function onSubmit(e) {
    e.preventDefault();
    const data = { name, email, password };
    if (!name || !email || !password || !confirm) return;
    if (password !== confirm) return;
    signUp(data);
  }
  console.log(isPending);
  return (
    <div className="p-[4rem] flex items-center h-full">
      <Form onSubmit={onSubmit}>
        <header className="flex flex-col gap-[0.5rem]">
          <h1 className="flex items-center sm:text-[2.4rem] relative">
            <img src="./logo.png" className="sm:w-[3.5rem] w-[2.5rem] h-auto" />
            TeoChat
          </h1>
          <h1 className="text-[2.4rem]">Criar Conta</h1>
          <span className="text-secondary-text-color">
            Crie a tua conta para começar a trabalhar com mais productividade
          </span>
        </header>
        <div className="flex flex-col my-[3rem] gap-[1.5rem]">
          <AuthInput
            value={name}
            setValue={setName}
            label="Nome Completo"
            id="fullName"
          />
          <AuthInput
            value={email}
            setValue={setEmail}
            label="Endereço de Email"
            id="email"
          />
          <AuthInput
            value={password}
            setValue={setPassword}
            label="Palavra-passe"
            id="password"
          />
          <AuthInput
            value={confirm}
            setValue={setConfirm}
            label="Confirmar Palavra-passe"
            id="confirm"
          />
        </div>
        <div className="flex flex-col w-full">
          <button className="bg-gradient-to-b text-[1.4rem] sm:text-[1.6rem] from-green-600 to-green-500 p-[1rem_2rem]  gap-[0.5rem] text-white hover:bg-green-700 rounded-full">
            {" "}
            Criar Conta
          </button>
        </div>
        <div className="text-secondary-text-color mt-[2rem] flex justify-between">
          <p>Já tem uma conta?</p>{" "}
          <span
            onClick={() => navigate("/sign-in")}
            className="text-blue-700 cursor-pointer"
          >
            Iniciar Sessão
          </span>
        </div>
      </Form>
    </div>
  );
}

export default SignUpForm;
