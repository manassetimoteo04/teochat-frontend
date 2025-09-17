import { useState } from "react";
import Form from "../ui/form";
import { toast } from "sonner";
import useSignIn from "../hooks/use-signin";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Input from "../../../shared/ui/input";
import Logo from "../../../shared/ui/logo";
import Heading from "../../../shared/ui/heading";
import Button from "../../../shared/ui/button";

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
          <Logo />
          <Heading as="h2" className="text-[2.4rem]">
            Iniciar Sessão
          </Heading>
          <span className="text-secondary-text-color">
            Informe as tuas credenciais para começar a tua productividade
          </span>
        </header>
        <div className="flex flex-col my-[3rem] gap-[1.5rem]">
          <Input
            value={email}
            setValue={setEmail}
            label="Endereço de Email"
            id="email"
          />
          <Input
            value={password}
            type="password"
            setValue={setPassword}
            label="Palavra-passe"
            id="password"
          />
        </div>
        <div className="flex flex-col w-full">
          <Button>{isPending ? <SpinnerMini /> : "Iniciar Sessão"}</Button>
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
