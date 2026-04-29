import { Building2, Layers3, Users, Camera } from "lucide-react";

import { useEffect, useState } from "react";
import { toast } from "sonner";

import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Tag from "../../../shared/ui/tag";
import SettingsPanel from "./settings-panel";
import { useAppContext } from "../../../shared/providers/context";

function companyToForm(company) {
  return {
    name: company?.name || "",
    ownerName: company?.ownerName || "",
    description: company?.description || "",
    industry: Array.isArray(company?.industry)
      ? company.industry.join(", ")
      : company?.industry || "",
    logo: company?.logo || "",
    logoFile: null,
  };
}

function CompanyGeneralSettings({
  company,
  isPending,
  canEdit,
  isInactive,
  membersCount,
  invitationsCount,
  onSubmit,
}) {
  const [form, setForm] = useState(companyToForm(company));
  useEffect(() => {
    setForm(companyToForm(company));
  }, [company]);

  function handleChange(e) {
    const { name, value, files } = e.target;

    if (name === "logo") {
      const file = files?.[0];
      if (!file) return;

      if (!file.type.startsWith("image/")) {
        toast.error("Seleccione apenas imagens");
        return;
      }

      const preview = URL.createObjectURL(file);

      setForm((prev) => ({
        ...prev,
        logo: preview,
        logoFile: file,
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

    const current = companyToForm(company);

    const changed =
      form.name !== current.name ||
      form.ownerName !== current.ownerName ||
      form.description !== current.description ||
      form.industry !== current.industry ||
      form.logoFile;

    if (!changed) {
      toast.warning("Nenhuma alteração foi detectada");
      return;
    }

    const formData = new FormData();

    formData.append("name", form.name);

    formData.append("ownerName", form.ownerName);

    formData.append("description", form.description);

    formData.append(
      "industry",
      JSON.stringify(
        form.industry
          .split(",")
          .map((i) => i.trim())
          .filter(Boolean),
      ),
    );

    if (form.logoFile) {
      formData.append("logo", form.logoFile);
    }

    onSubmit(formData);
  }

  const disabled = !canEdit || isPending || isInactive;

  return (
    <SettingsPanel
      title="Definições da empresa"
      description="
      Gere identidade e branding do workspace.
      "
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-[1.8rem]">
        <div
          className="
          rounded-3xl
          border border-gray-100
          bg-gray-50
          p-[1.6rem]
          flex  sm:flex-row
          items-center gap-[1.4rem]
        "
        >
          <div className="relative">
            <img
              src={form.avatar || "/default-user.jpg"}
              alt={company?.name}
              className="
        md:h-[7rem] md:w-[7rem] w-[4rem] h-[4rem]
        rounded-2xl border border-white
        object-cover shadow-sm
      "
            />

            <label
              htmlFor="avatar-upload"
              className="
        absolute -bottom-2 -right-2
        h-[2rem] w-[2rem]
        rounded-full bg-white border shadow
        flex items-center justify-center
        cursor-pointer hover:scale-105 transition
      "
            >
              <Camera size={13} />
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
            <p className="text-[1.4rem]  truncate md:text-[1.5rem] font-medium text-main-text-color">
              {company?.name}
            </p>

            <p className="mt-[0.3rem] text-[0.8rem] text-secondary-text-color">
              Clique no ícone para alterar o logotipo
            </p>
          </div>

          <Tag type={company?.isActive ? "active" : "inactive"}>
            {company?.isActive ? "Activo" : "Inactivo"}
          </Tag>
        </div>

        <div className="flex flex-wrap gap-3">
          {[
            {
              icon: Users,
              label: "Membros",
              value: membersCount,
            },
            {
              icon: Layers3,
              label: "Convites",
              value: invitationsCount,
            },
            {
              icon: Building2,
              label: "Owner",
              value: company?.ownerName || "-",
            },
          ].map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="
                rounded-2xl
                bg-gray-50
                px-5 py-4
              "
            >
              <div className="flex items-center gap-2">
                <Icon size={16} />
                <span className="text-[1.25rem]">{label}</span>
              </div>

              <p className="mt-2 text-[1.5rem] font-medium">{value}</p>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-[1.5rem]">
          <Field
            label="Nome da empresa"
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={disabled}
          />

          <Field
            label="Responsável"
            name="ownerName"
            value={form.ownerName}
            onChange={handleChange}
            disabled={disabled}
          />
        </div>
        <Field
          label="Indústria"
          name="industry"
          value={form.industry}
          onChange={handleChange}
          disabled={disabled}
          placeholder="Tecnologia, SaaS...
          "
        />
        <label className="flex flex-col gap-2">
          <span>Descrição</span>

          <textarea
            rows={5}
            name="description"
            value={form.description}
            onChange={handleChange}
            disabled={disabled}
            className="
              rounded-2xl border
              px-5 py-4
              resize-none
            "
          />
        </label>

        <div
          className="
          flex items-center
          justify-between
          gap-4
        "
        >
          <Button disabled={disabled}>
            {isPending ? <SpinnerMini /> : "Guardar empresa"}
          </Button>
        </div>
      </form>
    </SettingsPanel>
  );
}

function Field({ label, ...props }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[1.3rem] font-medium">{label}</span>

      <input
        {...props}
        className="
      rounded-2xl border
      px-5 py-4
      w-full
      outline-none
      focus:border-green-500
    "
      />
    </label>
  );
}

export default CompanyGeneralSettings;
