import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "../ui/form";
import { useVerifyAccount } from "../hooks/use-verify-account";
import { toast } from "sonner";
import { useResendVerificationCode } from "../hooks/use-resend-verification-code";
import Input from "../../../shared/ui/input";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";

function ConfirmForm() {
  const [confirm, setConfirm] = useState("");
  const navigate = useNavigate();
  const { verify, isPending } = useVerifyAccount();
  const { resendCode } = useResendVerificationCode();

  function onSubmit(e) {
    e.preventDefault();
    if (!confirm)
      return toast.error("Por favor insira o código de verificação");
    verify({ verificationCode: confirm });
  }
  function handleResendVerification() {
    resendCode();
  }
  return (
    <div className="p-[4rem] flex items-center h-full">
      <Form onSubmit={onSubmit}>
        <header className="flex flex-col gap-[0.5rem]">
          <h1 className="flex items-center sm:text-[2.4rem] relative">
            <img src="./logo.png" className="sm:w-[3.5rem] w-[2.5rem] h-auto" />
            TeoChat
          </h1>
          <h1 className="text-[2.4rem]">Confirmar Conta</h1>
          <span className="text-secondary-text-color">
            Insere o código de verificação de 8 dígitos para confirmar a tua
            conta
          </span>
        </header>
        <div className="flex flex-col my-[3rem] mb-[1rem] gap-[1.5rem]">
          <Input
            value={confirm}
            setValue={setConfirm}
            label="Inserir Código de Verificação"
            id="confirm"
          />
        </div>
        <div className="text-secondary-text-color text-[1.4rem]  mb-[2rem] flex justify-between">
          <p>Não Recebeu código?</p>{" "}
          <span
            onClick={handleResendVerification}
            className="text-blue-700 cursor-pointer"
          >
            Reenviar
          </span>
        </div>
        <div className="flex flex-col w-full">
          <Button>{isPending ? <SpinnerMini /> : "  Confirmar Conta"}</Button>
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

export default ConfirmForm;
