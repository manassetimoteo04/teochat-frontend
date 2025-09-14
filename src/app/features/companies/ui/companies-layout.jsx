import { LogOutIcon } from "lucide-react";
import Logo from "../../../shared/ui/logo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../../../shared/ui/full-page-spinner";
import { useSession } from "../../../shared/hooks/use-session";
import { toast } from "sonner";
import { useAppContext } from "../../../shared/providers/context";
function CompaniesLayout({ children }) {
  const { session, isPending } = useSession();
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (!session && !isPending) {
      navigate("/sign-in", { replace: true });
      toast.warning("Usuário não autenticado, redirecionando");
    }
    if (session && !session.isConfirmed) {
      navigate("/verify-account", { replace: true });
      toast.warning("Usuário não verificado, redirecionando");
    }
    if (session && session.isConfirmed)
      dispatch({ type: "SET_USER", payload: session });
  }, [isPending, navigate, session, dispatch]);
  if (isPending) return <FullPageSpinner />;
  if (!isPending && session)
    return (
      <div className="bg-main-bg-color overflow-scroll  h-screen">
        <div>
          <header className="p-[2rem_4rem]  flex justify-between items-center">
            <Logo />
            <button className="text-secondary-text-color">
              <LogOutIcon />
            </button>
          </header>
        </div>
        {children}
      </div>
    );
}

export default CompaniesLayout;
