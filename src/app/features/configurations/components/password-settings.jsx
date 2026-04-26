import { CheckCheck, Shield } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Tag from "../../../shared/ui/tag";
import SettingsPanel from "./settings-panel";

const initialForm = {
  currentPassword: "",
  newPassword: "",
  confirmPassword: "",
};

function PasswordSettings({ onSubmit, isPending, disabled }) {
  const [form, setForm] = useState(initialForm);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (!form.currentPassword || !form.newPassword) {
      toast.warning("Preenche a palavra-passe actual e a nova palavra-passe");
      return;
    }

    if (form.newPassword !== form.confirmPassword) {
      toast.warning("A confirmação da nova palavra-passe não confere");
      return;
    }

    onSubmit(
      {
        currentPassword: form.currentPassword,
        newPassword: form.newPassword,
      },
      {
        onSuccess: () => setForm(initialForm),
      },
    );
  }

  return (
    <SettingsPanel
      title="Segurança"
      description="Actualiza a palavra-passe da conta e mantém o acesso protegido."
    >
      <div className="grid gap-[2rem] xl:grid-cols-[1.1fr_0.8fr]">
        <form className="flex flex-col gap-[1.6rem]" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-[0.8rem]">
            <span className="text-[1.3rem] font-medium text-main-text-color">
              Palavra-passe actual
            </span>
            <input
              name="currentPassword"
              type="password"
              value={form.currentPassword}
              onChange={handleChange}
              disabled={disabled || isPending}
              className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
            />
          </label>
          <div className="grid gap-[1.6rem] md:grid-cols-2">
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Nova palavra-passe
              </span>
              <input
                name="newPassword"
                type="password"
                value={form.newPassword}
                onChange={handleChange}
                disabled={disabled || isPending}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
              />
            </label>
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Confirmar nova palavra-passe
              </span>
              <input
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                disabled={disabled || isPending}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
              />
            </label>
          </div>
          <div className="flex justify-end">
            <Button disabled={disabled || isPending} className="w-auto min-w-[18rem]">
              {isPending ? <SpinnerMini /> : "Actualizar palavra-passe"}
            </Button>
          </div>
        </form>

        <div className="grid gap-[1.2rem] content-start">
          <div className="rounded-2xl bg-[linear-gradient(135deg,#1d4ed8,#4f46e5)] p-[1.6rem] text-white shadow-[0_16px_32px_rgba(79,70,229,0.25)]">
            <div className="flex items-center gap-[0.8rem]">
              <Shield size={18} />
              <p className="text-[1.6rem] font-semibold">Higiene de segurança</p>
            </div>
            <p className="mt-[0.8rem] text-[1.3rem] text-white/85">
              Usa uma palavra-passe única e confirma a alteração antes de sair
              da página.
            </p>
            <div className="mt-[1.4rem] flex flex-wrap gap-[0.8rem]">
              <Tag className="border-white/20 bg-white/15 text-white">
                Palavra-passe manual
              </Tag>
              <Tag className="border-white/20 bg-white/15 text-white">
                Sem 2FA disponível
              </Tag>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-[1.4rem]">
            <div className="flex items-center gap-[0.8rem] text-main-text-color">
              <CheckCheck size={16} />
              <p className="text-[1.4rem] font-medium">Recomendações</p>
            </div>
            <ul className="mt-[1rem] flex flex-col gap-[0.8rem] text-[1.3rem] text-secondary-text-color">
              <li>Usa pelo menos 12 caracteres.</li>
              <li>Evita reutilizar a mesma palavra-passe noutros serviços.</li>
              <li>Confirma a nova palavra-passe localmente antes de enviar.</li>
            </ul>
          </div>
        </div>
      </div>
    </SettingsPanel>
  );
}

export default PasswordSettings;
