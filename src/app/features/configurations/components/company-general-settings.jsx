import { Building2, Layers3, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import Button from "../../../shared/ui/button";
import SpinnerMini from "../../../shared/ui/SpinnerMini";
import Tag from "../../../shared/ui/tag";
import SettingsPanel from "./settings-panel";

function companyToForm(company) {
  return {
    name: company?.name || "",
    ownerName: company?.ownerName || "",
    description: company?.description || "",
    industry: Array.isArray(company?.industry)
      ? company.industry.join(", ")
      : company?.industry || "",
    logo: company?.logo || "",
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

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const currentForm = companyToForm(company);
    const payload = {};

    Object.keys(form).forEach((field) => {
      if (form[field] !== currentForm[field]) {
        if (field === "industry") {
          payload[field] = form[field]
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean);
        } else {
          payload[field] = form[field];
        }
      }
    });

    if (!Object.keys(payload).length) {
      toast.warning("Nenhuma alteração foi detectada na empresa");
      return;
    }

    onSubmit(payload);
  }

  const disabled = !canEdit || isPending || isInactive;

  return (
    <SettingsPanel
      title="Definições da empresa"
      description="Gere identidade, responsável, descrição, indústria e imagem principal do workspace."
    >
      <div className="grid gap-[2rem] xl:grid-cols-[1.18fr_0.82fr]">
        <form className="flex flex-col gap-[1.6rem]" onSubmit={handleSubmit}>
          <div className="grid gap-[1.6rem] md:grid-cols-2">
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Nome da empresa
              </span>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                disabled={disabled}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
              />
            </label>
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Responsável
              </span>
              <input
                name="ownerName"
                value={form.ownerName}
                onChange={handleChange}
                disabled={disabled}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
              />
            </label>
          </div>
          <label className="flex flex-col gap-[0.8rem]">
            <span className="text-[1.3rem] font-medium text-main-text-color">
              Descrição
            </span>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              disabled={disabled}
              rows={5}
              className="resize-none rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
            />
          </label>
          <div className="grid gap-[1.6rem] md:grid-cols-2">
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Indústria
              </span>
              <input
                name="industry"
                value={form.industry}
                onChange={handleChange}
                disabled={disabled}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
                placeholder="Tecnologia, SaaS, Marketing"
              />
            </label>
            <label className="flex flex-col gap-[0.8rem]">
              <span className="text-[1.3rem] font-medium text-main-text-color">
                Logo
              </span>
              <input
                name="logo"
                value={form.logo}
                onChange={handleChange}
                disabled={disabled}
                className="rounded-2xl border border-main-border-color bg-white px-[1.4rem] py-[1.3rem] text-[1.4rem] outline-none focus:border-green-500 disabled:bg-gray-50"
                placeholder="https://... ou /images/logo.png"
              />
            </label>
          </div>
          <div className="flex items-center justify-between gap-[1rem]">
            <p className="text-[1.2rem] text-secondary-text-color">
              {isInactive
                ? "Empresa desactivada. As acções de gestão ficam bloqueadas."
                : canEdit
                  ? "As alterações são guardadas parcialmente consoante os campos modificados."
                  : "Tens acesso apenas de leitura nesta secção."}
            </p>
            <Button disabled={disabled} className="w-auto min-w-[15rem]">
              {isPending ? <SpinnerMini /> : "Guardar empresa"}
            </Button>
          </div>
        </form>

        <div className="grid gap-[1.2rem] content-start">
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-[1.4rem]">
            <div className="flex items-center gap-[1rem]">
              <img
                src={form.logo || company?.logo || "/logo-small.png"}
                alt={company?.name}
                className="h-[5.6rem] w-[5.6rem] rounded-2xl border border-white bg-white object-cover p-[0.4rem]"
              />
              <div>
                <p className="text-[1.5rem] font-medium text-main-text-color">
                  {company?.name}
                </p>
                <p className="text-[1.3rem] text-secondary-text-color">
                  Identidade principal do workspace
                </p>
              </div>
            </div>
            <div className="mt-[1.2rem]">
              <Tag type={company?.isActive ? "active" : "inactive"}>
                {company?.isActive ? "Empresa activa" : "Empresa inactiva"}
              </Tag>
            </div>
          </div>

          <div className="rounded-2xl border border-gray-100 bg-white p-[1.4rem]">
            <p className="text-[1.4rem] font-medium text-main-text-color">
              Estatísticas da conta
            </p>
            <div className="mt-[1.2rem] grid gap-[1rem]">
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-[1.2rem] py-[1rem]">
                <div className="flex items-center gap-[0.8rem]">
                  <Users size={16} className="text-secondary-text-color" />
                  <span className="text-[1.3rem] text-secondary-text-color">Membros</span>
                </div>
                <span className="text-[1.5rem] font-medium text-main-text-color">
                  {membersCount}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-[1.2rem] py-[1rem]">
                <div className="flex items-center gap-[0.8rem]">
                  <Layers3 size={16} className="text-secondary-text-color" />
                  <span className="text-[1.3rem] text-secondary-text-color">Convites</span>
                </div>
                <span className="text-[1.5rem] font-medium text-main-text-color">
                  {invitationsCount}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-2xl bg-gray-50 px-[1.2rem] py-[1rem]">
                <div className="flex items-center gap-[0.8rem]">
                  <Building2 size={16} className="text-secondary-text-color" />
                  <span className="text-[1.3rem] text-secondary-text-color">Proprietário</span>
                </div>
                <span className="text-[1.4rem] font-medium text-main-text-color">
                  {company?.ownerName || "Sem responsável"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SettingsPanel>
  );
}

export default CompanyGeneralSettings;
