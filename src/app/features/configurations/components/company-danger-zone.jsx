import { Ban } from "lucide-react";
import Button from "../../../shared/ui/button";
import Modal from "../../../shared/ui/modal";
import SettingsConfirmAction from "./settings-confirm-action";
import SettingsPanel from "./settings-panel";

function CompanyDangerZone({
  canDeactivate,
  isInactive,
  deactivate,
  isPending,
}) {
  if (!canDeactivate) return null;

  return (
    <SettingsPanel
      title="Zona de risco"
      description="Acções irreversíveis para este workspace. Esta área aparece apenas para super administradores."
      className="border-red-100"
    >
      <Modal>
        <div className="flex flex-col gap-[1.6rem] rounded-2xl border border-red-100 bg-red-50 px-[1.6rem] py-[1.6rem] md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-[1rem]">
            <span className="flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-full bg-white text-red-600">
              <Ban />
            </span>
            <div>
              <p className="text-[1.5rem] font-medium text-main-text-color">
                Desactivar empresa
              </p>
              <p className="mt-[0.4rem] max-w-[58rem] text-[1.3rem] text-secondary-text-color">
                Depois da desactivação, a empresa fica inactiva e as acções de
                gestão devem ser bloqueadas.
              </p>
            </div>
          </div>
          <Modal.Open id="deactivate-company">
            <Button
              variation="danger"
              disabled={isInactive || isPending}
              className="w-auto"
            >
              Desactivar
            </Button>
          </Modal.Open>
        </div>
        <Modal.Window id="deactivate-company">
          <SettingsConfirmAction
            title="Desactivar empresa"
            description="Esta acção coloca a empresa como inactiva e bloqueia definições e gestão de membros."
            actionLabel="Confirmar desactivação"
            isPending={isPending}
            onConfirm={(closeModal) => deactivate(undefined, { onSuccess: closeModal })}
          />
        </Modal.Window>
      </Modal>
    </SettingsPanel>
  );
}

export default CompanyDangerZone;
