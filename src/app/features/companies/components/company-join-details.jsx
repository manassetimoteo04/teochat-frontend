import { useNavigate, useParams } from "react-router-dom";
import Button from "../../../shared/ui/button";
import { ArrowLeft } from "lucide-react";
import { useCheckInvite } from "../hooks/use-check-invite";
import FullPageSpinner from "../../../shared/ui/full-page-spinner";
import JoinDetails from "./join-details";
import JoinErrorBox from "../ui/join-error-box";

function CompanyJoinDetails() {
  const navigate = useNavigate();
  const { invitationId } = useParams();
  const { data, isPending, error } = useCheckInvite(invitationId);
  if (isPending) return <FullPageSpinner />;
  return (
    <div className="max-w-[60rem] rounded-2xl my-[8rem]  border-main-border-color bg-main-bg-color-2 m-[0_auto]">
      <header className="flex gap-[1rem] flex-col justify-between p-[2rem] border-b  border-main-border-color">
        <div className="flex justify-between items-center ">
          <h3 className="text-[1.8rem]">Convite para Aderir a Empresa</h3>
          <div>
            <Button
              onClick={() => navigate(-1)}
              variation="secondary"
              className="bg-main-bg-color p-[0.8rem_2rem] flex gap-[0.5rem] text-secondary-text-color disabled:opacity-50  rounded-full  mt-3 border border-main-border-color hover:border-main-color hover:text-main-color"
            >
              <ArrowLeft /> Voltar
            </Button>
          </div>
        </div>
      </header>
      {!error && <JoinDetails data={data} />}
      {error && <JoinErrorBox error={error} />}
    </div>
  );
}

export default CompanyJoinDetails;
