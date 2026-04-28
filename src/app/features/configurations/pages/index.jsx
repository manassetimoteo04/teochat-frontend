import {
  AlertTriangle,
  Building2,
  Settings2,
  ShieldCheck,
  Users2,
} from "lucide-react";
import { useMemo } from "react";
import { useSearchParams, useParams } from "react-router-dom";
import { useAppContext } from "../../../shared/providers/context";
import Spinner from "../../../shared/ui/Spinner";
import { useCompanyMembers } from "../../companies/hooks/use-company-members";
import CompanyDangerZone from "../components/company-danger-zone";
import CompanyGeneralSettings from "../components/company-general-settings";
import CompanyInvitationsList from "../components/company-invitations-list";
import CompanyMembersList from "../components/company-members-list";
import PasswordSettings from "../components/password-settings";
import UserProfileSettings from "../components/user-profile-settings";
import { useCompanyInvitations } from "../hooks/use-company-invitations";
import { useCompanySettings } from "../hooks/use-company-settings";
import { useDeactivateCompany } from "../hooks/use-deactivate-company";
import { usePromoteCompanyMember } from "../hooks/use-promote-company-member";
import { useRemoveCompanyMember } from "../hooks/use-remove-company-member";
import { useSettingsProfile } from "../hooks/use-settings-profile";
import { useUpdateCompanySettings } from "../hooks/use-update-company-settings";
import { useUpdatePassword } from "../hooks/use-update-password";
import { useUpdateProfile } from "../hooks/use-update-profile";

const sections = [
  {
    id: "account",
    title: "Conta",
    description: "Informações pessoais e identidade do utilizador.",
    icon: <Settings2 size={18} />,
  },
  {
    id: "company",
    title: "Empresa",
    description: "Configuração principal do workspace.",
    icon: <Building2 size={18} />,
  },
  {
    id: "security",
    title: "Segurança",
    description: "Palavra-passe e protecção da conta.",
    icon: <ShieldCheck size={18} />,
  },
  {
    id: "members",
    title: "Membros",
    description: "Papéis, acessos e convites.",
    icon: <Users2 size={18} />,
  },
  {
    id: "danger",
    title: "Zona de risco",
    description: "Acções destrutivas e restritas.",
    icon: <AlertTriangle size={18} />,
  },
];

function ConfigurationsPage() {
  const { companyId } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { currentCompany, currentRole } = useAppContext();
  const { profile, isPending: isProfilePending } = useSettingsProfile();
  const { company, isPending: isCompanyPending } =
    useCompanySettings(companyId);
  const { invitations, isPending: isInvitationsPending } =
    useCompanyInvitations(companyId);
  const { data: members, isPending: isMembersPending } = useCompanyMembers();
  const { updateProfile, isPending: isUpdatingProfile } = useUpdateProfile();
  const { updatePassword, isPending: isUpdatingPassword } = useUpdatePassword();
  const { updateCompany, isPending: isUpdatingCompany } =
    useUpdateCompanySettings();
  const { promoteMember, isPending: isPromoting } = usePromoteCompanyMember();
  const { removeMember, isPending: isRemoving } = useRemoveCompanyMember();
  const { deactivate, isPending: isDeactivating } = useDeactivateCompany();

  const resolvedCompany = company || currentCompany;
  const isInactive = resolvedCompany?.isActive === false;
  const canEditCompany =
    currentRole === "admin" || currentRole === "super_admin";
  const canManageMembers = canEditCompany;
  const canDeactivate = currentRole === "super_admin";
  const membersCount = Array.isArray(members) ? members.length + 1 : 1;
  const invitationsCount = Array.isArray(invitations) ? invitations.length : 0;

  const activeSection = useMemo(() => {
    const section = searchParams.get("section");
    return sections.find((item) => item.id === section)?.id || "account";
  }, [searchParams]);

  const currentSectionData =
    sections.find((item) => item.id === activeSection) || sections[0];

  function changeSection(sectionId) {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set("section", sectionId);
    setSearchParams(nextParams);
  }

  if (isProfilePending || isCompanyPending) {
    return (
      <div className="h-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="p-[2rem] pb-[3rem]">
      <div className="overflow-hidden ">
        <div className="grid min-h-[calc(100dvh-12rem)] items-start lg:grid-cols-[36rem_1fr]">
          <aside className="border-b rounded-2xl h-fit border border-gray-200 bg-[#fff] shadow-[0_24px_70px_rgba(15,23,42,0.08)] lg:border-b-0 lg:border-r">
            <div className="px-[1.8rem] py-[2rem]">
              <p className="text-[2.2rem] font-semibold text-main-text-color">
                Configurações
              </p>
              <p className="mt-[0.4rem] text-[1.3rem] text-secondary-text-color">
                Área central para conta, empresa e permissões.
              </p>
            </div>

            <nav className="flex gap-[0.8rem] overflow-x-auto px-[1.2rem] pb-[1.2rem] lg:flex-col lg:overflow-visible">
              {sections.map((section) => {
                const isActive = activeSection === section.id;
                if (
                  (!canEditCompany && section.id === "members") ||
                  (!canDeactivate && section.id === "danger")
                )
                  return;
                return (
                  <button
                    key={section.id}
                    onClick={() => changeSection(section.id)}
                    className={`min-w-[20rem] rounded-2xl border px-[1.4rem] py-[1.2rem] text-left transition lg:min-w-0 ${
                      isActive
                        ? "border-blue-100 bg-blue-50 text-blue-700 shadow-sm"
                        : "border-transparent bg-transparent text-secondary-text-color hover:border-gray-100 hover:bg-gray-50"
                    }`}
                  >
                    <span className="flex items-center gap-[0.8rem] text-[1.4rem] font-medium">
                      {section.icon}
                      {section.title}
                    </span>
                    <span className="mt-[0.5rem] hidden text-[1.2rem] leading-[1.6rem] lg:block">
                      {section.description}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="flex flex-col">
            <header className="border-b  px-[2rem] py-[1.8rem] backdrop-blur">
              <div className="flex items-start gap-[1.2rem]">
                <span className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-2xl bg-white text-blue-700">
                  {currentSectionData.icon}
                </span>
                <div>
                  <h2 className="text-[2.8rem] font-semibold text-main-text-color">
                    {currentSectionData.title}
                  </h2>
                  <p className="mt-[0.3rem] text-[1.4rem] text-secondary-text-color">
                    {currentSectionData.description}
                  </p>
                </div>
              </div>
            </header>

            <div className="flex-1 p-[2rem]">
              {isInactive && (
                <div className="mb-[2rem] rounded-3xl border border-amber-200 bg-amber-50 px-[1.8rem] py-[1.4rem] text-[1.4rem] text-amber-800">
                  Esta empresa está desactivada. A página permanece visível para
                  consulta, mas as acções de gestão ficam bloqueadas.
                </div>
              )}

              {activeSection === "account" && (
                <UserProfileSettings
                  profile={profile}
                  isPending={isUpdatingProfile}
                  disabled={!profile?.isActive}
                  onSubmit={(payload) => updateProfile(payload)}
                />
              )}

              {activeSection === "company" && (
                <CompanyGeneralSettings
                  company={resolvedCompany}
                  isPending={isUpdatingCompany}
                  canEdit={canEditCompany}
                  isInactive={isInactive}
                  membersCount={membersCount}
                  invitationsCount={invitationsCount}
                  onSubmit={(payload) => updateCompany({ companyId, payload })}
                />
              )}

              {activeSection === "security" && (
                <PasswordSettings
                  isPending={isUpdatingPassword}
                  disabled={!profile?.isActive}
                  onSubmit={(payload, options) =>
                    updatePassword(payload, options)
                  }
                />
              )}

              {activeSection === "members" && (
                <div className="flex flex-col gap-[2rem]">
                  <CompanyMembersList
                    members={members}
                    isPending={isMembersPending}
                    canManage={canManageMembers}
                    canPromote={canEditCompany}
                    isInactive={isInactive}
                    promoteMember={({ memberId }) =>
                      promoteMember({ companyId, memberId })
                    }
                    isPromoting={isPromoting}
                    removeMember={({ memberId }, options) =>
                      removeMember({ companyId, memberId }, options)
                    }
                    isRemoving={isRemoving}
                  />
                  <CompanyInvitationsList
                    invitations={invitations}
                    isPending={isInvitationsPending}
                  />
                </div>
              )}

              {activeSection === "danger" && (
                <CompanyDangerZone
                  canDeactivate={canDeactivate}
                  isInactive={isInactive}
                  deactivate={(_, options) => deactivate(companyId, options)}
                  isPending={isDeactivating}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationsPage;
