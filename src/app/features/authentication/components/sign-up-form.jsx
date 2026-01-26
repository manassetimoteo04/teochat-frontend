import { useState } from "react";
import { useSignUp } from "../hooks/use-signup";
import Input from "../../../shared/ui/input";
import Form from "../ui/form";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Button from "../../../shared/ui/button";
import Logo from "../../../shared/ui/logo";
import Heading from "../../../shared/ui/heading";

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
    if (!name || !email || !password || !confirm)
      return toast.error("Por favor preencha todos os campos");
    if (password !== confirm)
      return toast.error("Por favor confirme a senha correctamente");
    signUp(data);
  }
  return (
    <div className="md:p-[4rem] p-[2rem]  flex items-center h-full">
      <Form onSubmit={onSubmit}>
        <header className="flex flex-col gap-[0.5rem]">
          <Logo />
          <Heading as="h2" className="text-[2.4rem]">
            Criar Conta
          </Heading>
          <span className="text-secondary-text-color">
            Crie a tua conta para começar a trabalhar com mais productividade
          </span>
        </header>
        <div className="flex flex-col my-[2rem] gap-[1.5rem]">
          <Input
            value={name}
            setValue={setName}
            label="Nome Completo"
            id="fullName"
          />
          <Input
            value={email}
            setValue={setEmail}
            label="Endereço de Email"
            id="email"
          />
          <Input
            type="password"
            value={password}
            setValue={setPassword}
            label="Palavra-passe"
            id="password"
          />
          <Input
            type="password"
            value={confirm}
            setValue={setConfirm}
            label="Confirmar Palavra-passe"
            id="confirm"
          />
        </div>
        <div className="flex flex-col w-full">
          <Button>{isPending ? <SpinnerMini /> : "Criar Conta"}</Button>
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
