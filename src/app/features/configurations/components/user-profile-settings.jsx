import { CalendarDays, CheckCircle2, Mail, UserRound } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Tag from "../../../shared/ui/tag";
import { formatDate } from "../../../shared/utils/helpers";
import SettingsPanel from "./settings-panel";

function UserProfileSettings({ profile, isPending, onSubmit, disabled }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    avatar: "",
  });

  useEffect(() => {
    if (!profile) return;

    setForm({
      name: profile.name || "",
      email: profile.email || "",
      avatar: profile.avatar || "",
    });
  }, [profile]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const payload = {};

    ["name", "email", "avatar"].forEach((field) => {
      if (form[field] !== (profile?.[field] || "")) payload[field] = form[field];
    });

    if (!Object.keys(payload).length) {
      toast.warning("Nenhuma alteração foi detectada no perfil");
      return;
    }

    onSubmit(payload);
  }

  return (
    <SettingsPanel
      title="Informação pessoal"
      description="Actualiza os teus dados principais e a forma como apareces dentro do workspace."
    >
      <form className="grid gap-[2rem] xl:grid-cols-[1.2fr_0.75fr]" onSubmit={handleSubmit}>
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex flex-col gap-[1.4rem] rounded-2xl border border-gray-100 bg-gray-50 p-[1.4rem] sm:flex-row sm:items-center">
            <img
              src={form.avatar || profile?.avatar || "/default-user.jpg"}
              alt={profile?.name}
              className="h-[7rem] w-[7rem] rounded-2xl border border-white object-cover shadow-sm"
            />
            <div className="flex-1">
              <p className="text-[1.5rem] font-medium text-main-text-color">
                Fotografia de perfil
              </p>
              <p className="mt-[0.3rem] text-[1.3rem] text-secondary-text-color">
                O avatar é guardado como URL ou caminho simples.
              </p>
            </div>
            <Tag type={profile?.isActive ? "active" : "inactive"}>
              {profile?.isActive ? "Conta activa" : "Conta inactiva"}
            </Tag>
          </div>

          <div className="grid gap-[1.6rem] md:grid-cols-2">
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Nome completo
              </span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={disabled || isPending}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
                placeholder="O teu nome"
              />
            </label>
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Email
              </span>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                disabled={disabled || isPending}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
                placeholder="teu@email.com"
              />
            </label>
          </div>
          <label className="flex flex-col gap-[0.8rem]">
            <span className="text-[1.3rem] font-medium text-main-text-color">
              URL do avatar
            </span>
            <input
              name="avatar"
              value={form.avatar}
              onChange={handleChange}
              disabled={disabled || isPending}
              className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
              placeholder="https://... ou /images/avatar.png"
            />
            <span className="text-[1.2rem] text-secondary-text-color">
              Usa uma URL ou caminho simples para a imagem.
            </span>
          </label>
          <div className="flex justify-end">
            <Button disabled={disabled || isPending} className="w-auto min-w-[16rem]">
              {isPending ? <SpinnerMini /> : "Guardar alterações"}
            </Button>
          </div>
        </div>

        <div className="grid gap-[1rem] content-start">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-[1.4rem]">
            <p className="text-[1.4rem] font-medium text-main-text-color">
              Resumo da conta
            </p>
            <div className="mt-[1.2rem] grid gap-[1rem]">
              <div className="flex items-start gap-[0.9rem]">
                <UserRound size={16} className="mt-[0.2rem] text-secondary-text-color" />
                <div>
                  <p className="text-[1.2rem] uppercase tracking-[0.12rem] text-secondary-text-color">
                    Utilizador
                  </p>
                  <p className="text-[1.4rem] text-main-text-color">{profile?.name}</p>
                </div>
              </div>
              <div className="flex items-start gap-[0.9rem]">
                <Mail size={16} className="mt-[0.2rem] text-secondary-text-color" />
                <div>
                  <p className="text-[1.2rem] uppercase tracking-[0.12rem] text-secondary-text-color">
                    Contacto
                  </p>
                  <p className="text-[1.4rem] text-main-text-color">{profile?.email}</p>
                </div>
              </div>
              <div className="flex items-start gap-[0.9rem]">
                <CheckCircle2 size={16} className="mt-[0.2rem] text-secondary-text-color" />
                <div>
                  <p className="text-[1.2rem] uppercase tracking-[0.12rem] text-secondary-text-color">
                    Confirmação
                  </p>
                  <p className="text-[1.4rem] text-main-text-color">
                    {profile?.isConfirmed ? "Conta confirmada" : "Confirmação pendente"}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-[0.9rem]">
                <CalendarDays size={16} className="mt-[0.2rem] text-secondary-text-color" />
                <div>
                  <p className="text-[1.2rem] uppercase tracking-[0.12rem] text-secondary-text-color">
                    Registo
                  </p>
                  <p className="text-[1.4rem] text-main-text-color">
                    {profile?.createdAt
                      ? formatDate(new Date(profile.createdAt), true, true)
                      : "Sem data"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </SettingsPanel>
  );
}

export default UserProfileSettings;
