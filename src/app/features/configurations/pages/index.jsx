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
    icon: <Settings2 size={16} />,
  },
  {
    id: "company",
    title: "Empresa",
    description: "Configuração principal do workspace.",
    icon: <Building2 size={16} />,
  },
  {
    id: "security",
    title: "Segurança",
    description: "Palavra-passe e protecção da conta.",
    icon: <ShieldCheck size={16} />,
  },
  {
    id: "members",
    title: "Membros",
    description: "Papéis, acessos e convites.",
    icon: <Users2 size={16} />,
  },
  {
    id: "danger",
    title: "Zona de risco",
    description: "Acções destrutivas e restritas.",
    icon: <AlertTriangle size={16} />,
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
  const isSuperAdmin = currentRole === "super_admin";
  const canManageMembers = canEditCompany;
  const canDeactivate = currentRole === "super_admin";
  const membersCount = Array.isArray(members) ? members.length + 1 : 1;
  const invitationsCount = Array.isArray(invitations) ? invitations.length : 0;

  const visibleSections = sections.filter((section) => {
    if (!canEditCompany && section.id === "members") return false;
    if (!canDeactivate && isSuperAdmin && section.id === "danger") return false;
    return true;
  });

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
      <div className="h-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="lg:hidden sticky top-0 z-20 bg-white border-b border-gray-200 shadow-sm">
        <div className="px-4 pt-4 pb-0">
          <p className="text-[1.8rem] font-semibold text-main-text-color">
            Configurações
          </p>
          <p className="text-[1.2rem] text-secondary-text-color mb-3">
            Conta, empresa e permissões.
          </p>
        </div>
        <div className="flex overflow-x-auto scrollbar-hide gap-1 px-3 pb-0">
          {visibleSections.map((section) => {
            const isActive = activeSection === section.id;
            return (
              <button
                key={section.id}
                onClick={() => changeSection(section.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 text-[1.3rem] font-medium border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-secondary-text-color hover:text-main-text-color hover:border-gray-300"
                }`}
              >
                {section.icon}
                {section.title}
              </button>
            );
          })}
        </div>
      </div>

      <div className="max-w-[120rem] mx-auto p-4 sm:p-6 lg:p-8">
        <div className="lg:grid lg:grid-cols-[28rem_1fr] xl:grid-cols-[30rem_1fr] lg:gap-6 lg:items-start">
          <aside className="hidden lg:block sticky top-8 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="px-6 py-6 border-b border-gray-100">
              <p className="text-[2rem] font-semibold text-main-text-color leading-tight">
                Configurações
              </p>
              <p className="mt-1 text-[1.3rem] text-secondary-text-color">
                Conta, empresa e permissões.
              </p>
            </div>
            <nav className="p-3 flex flex-col gap-1">
              {visibleSections.map((section) => {
                const isActive = activeSection === section.id;
                return (
                  <button
                    key={section.id}
                    onClick={() => changeSection(section.id)}
                    className={`w-full rounded-xl px-4 py-3 text-left transition-all duration-150 ${
                      isActive
                        ? "bg-blue-50 border border-blue-100 text-blue-700 shadow-sm"
                        : "border border-transparent text-secondary-text-color hover:bg-gray-50 hover:border-gray-100"
                    }`}
                  >
                    <span className="flex items-center gap-3 text-[1.4rem] font-medium">
                      {section.icon}
                      {section.title}
                    </span>
                    <span className="mt-1 text-[1.2rem] leading-relaxed block opacity-70">
                      {section.description}
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <main className="min-w-0 mt-4 lg:mt-0">
            <header className="hidden lg:flex items-center gap-4 mb-5 p-5 bg-white rounded-2xl border border-gray-200 shadow-sm">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                {currentSectionData.icon}
              </span>
              <div>
                <h2 className="text-[2rem] font-semibold text-main-text-color leading-tight">
                  {currentSectionData.title}
                </h2>
                <p className="mt-0.5 text-[1.3rem] text-secondary-text-color">
                  {currentSectionData.description}
                </p>
              </div>
            </header>

            <div className="lg:hidden flex items-center gap-3 mb-4">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600 flex-shrink-0">
                {currentSectionData.icon}
              </span>
              <div>
                <h2 className="text-[1.6rem] font-semibold text-main-text-color leading-tight">
                  {currentSectionData.title}
                </h2>
                <p className="text-[1.2rem] text-secondary-text-color">
                  {currentSectionData.description}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4 sm:p-6">
              {isInactive && (
                <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 text-[1.3rem] text-amber-800 leading-relaxed">
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
                <div className="flex flex-col gap-6">
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
          </main>
        </div>
      </div>
    </div>
  );
}

export default ConfigurationsPage;
