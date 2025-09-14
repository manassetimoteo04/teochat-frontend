import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import { useSession } from "../hooks/use-session";
import { useAppContext } from "../providers/context";
import FullPageSpinner from "./full-page-spinner";
import { useCurrentCompany } from "../../features/companies/hooks/use-current-company";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { companyId } = useParams();
  const { session, isPending } = useSession();
  const { company, isPending: isPending2 } = useCurrentCompany(companyId);
  const { dispatch } = useAppContext();
  useEffect(() => {
    if (session && company) {
      dispatch({ type: "SET_USER", payload: session });
      dispatch({ type: "SET_COMPANY", payload: company.companyId });
      dispatch({ type: "SET_ROLE", payload: company.role });
    }
    if (session && !company && !isPending && !isPending2) {
      navigate("/companies", { replace: true });
      toast.warning("Usuário não autorizado, redirecionando");
    }
    if (!session && !company && !isPending && !isPending2) {
      navigate("/sign-in", { replace: true });
      toast.warning("Usuário não autenticado,edirecionando");
    }
    if (!session && !isPending) navigate("/sign-in", { replace: true });
  }, [session, navigate, dispatch, isPending, company, isPending2]);

  if (isPending || isPending2) return <FullPageSpinner />;
  if (session && session && company && !isPending && !isPending2)
    return children;
}

export default ProtectedRoute;
