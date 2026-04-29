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
    avatarFile: null,
  });

  useEffect(() => {
    if (!profile) return;

    setForm((prev) => ({
      ...prev,
      name: profile.name || "",
      email: profile.email || "",
      avatar: profile.avatar || "",
    }));
  }, [profile]);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "avatar") {
      const file = files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Seleccione apenas imagens.");
        return;
      }

      const previewUrl = URL.createObjectURL(file);

      setForm((prev) => ({
        ...prev,
        avatar: previewUrl, // preview
        avatarFile: file, // ficheiro real para backend
      }));

      return;
    }

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const hasChanges =
      form.name !== (profile?.name || "") ||
      form.email !== (profile?.email || "") ||
      form.avatarFile;

    const formData = new FormData();
    if (!hasChanges) {
      toast.warning("Nenhuma alteração foi detectada no perfil");
      return;
    }

    formData.append("name", form.name);
    formData.append("email", form.email);
    if (form.avatarFile) {
      formData.append("avatar", form.avatarFile);
    }

    console.log(formData);
    onSubmit(formData);
  }

  console.log(form);
  return (
    <SettingsPanel
      title="Informação pessoal"
      description="Actualiza os teus dados principais e a forma como apareces dentro do workspace."
    >
      <form
        className="grid gap-[2rem] xl:grid-cols-[1.2fr_0.75fr]"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col gap-[1.6rem]">
          <div className="flex flex-col gap-[1.4rem] rounded-2xl border border-gray-100 bg-gray-50 p-[1.4rem] sm:flex-row sm:items-center">
            <div className="relative">
              <img
                src={form.avatar || "/default-user.jpg"}
                alt={profile?.name}
                className="
        h-[7rem] w-[7rem]
        rounded-2xl border border-white
        object-cover shadow-sm
      "
              />

              <label
                htmlFor="avatar-upload"
                className="
        absolute -bottom-2 -right-2
        h-[3rem] w-[3rem]
        rounded-full bg-white border shadow
        flex items-center justify-center
        cursor-pointer hover:scale-105 transition
      "
              >
                +
              </label>

              <input
                id="avatar-upload"
                name="avatar"
                type="file"
                accept="image/*"
                onChange={handleChange}
                disabled={disabled || isPending}
                className="hidden"
              />
            </div>

            <div className="flex-1">
              <p className="text-[1.5rem] font-medium text-main-text-color">
                Fotografia de perfil
              </p>

              <p className="mt-[0.3rem] text-[0.8rem] text-secondary-text-color">
                Clique no botão para alterar o avatar.
              </p>
            </div>

            <Tag type={profile?.isActive ? "active" : "inactive"}>
              {profile?.isActive ? "Activo" : " Inactivo"}
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
                disabled
                value={form.email}
                onChange={handleChange}
                className="rounded-2xl border opacity-60 border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
                placeholder="teu@email.com"
              />
            </label>
          </div>

          <div className="flex justify-end">
            <Button
              disabled={disabled || isPending}
              className="w-auto min-w-[16rem]"
            >
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
                <UserRound size={16} />
                <div>
                  <p className="text-[1.2rem] uppercase">Utilizador</p>
                  <p className="text-[1.4rem]">{profile?.name}</p>
                </div>
              </div>

              <div className="flex items-start gap-[0.9rem]">
                <Mail size={16} />
                <div>
                  <p className="text-[1.2rem] uppercase">Contacto</p>
                  <p className="text-[1.4rem]">{profile?.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-[0.9rem]">
                <CheckCircle2 size={16} />
                <div>
                  <p className="text-[1.2rem] uppercase">Confirmação</p>
                  <p className="text-[1.4rem]">
                    {profile?.isConfirmed
                      ? "Conta confirmada"
                      : "Confirmação pendente"}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-[0.9rem]">
                <CalendarDays size={16} />
                <div>
                  <p className="text-[1.2rem] uppercase">Registo</p>
                  <p className="text-[1.4rem]">
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
