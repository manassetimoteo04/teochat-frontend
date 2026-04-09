import { LogOutIcon } from "lucide-react";
import Logo from "../../../shared/ui/logo";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../../../shared/ui/full-page-spinner";
import { useSession } from "../../../shared/hooks/use-session";
import { toast } from "sonner";
import { useAppContext } from "../../../shared/providers/context";
import Button from "../../../shared/ui/button";
function CompaniesLayout({ children }) {
  const { session, isPending } = useSession();
  const { dispatch } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (isPending) return;

    if (!session) {
      navigate("/sign-in", { replace: true });
      toast.warning("Usuário não autenticado, redirecionando");
      return;
    }

    if (!session.isConfirmed) {
      navigate("/verify-account", { replace: true });
      toast.warning("Usuário não verificado, redirecionando");
      return;
    }

    dispatch({ type: "SET_USER", payload: session });
  }, [isPending, navigate, session, dispatch]);
  if (isPending) return <FullPageSpinner />;
  if (!isPending && session)
    return (
      <div className="bg-main-bg-color relative min-h-screen overflow-y-auto">
        <div>
          <header className="md:px-[4rem] px-[2rem] top-0 left-0 w-full h-[8rem] fixed flex justify-between items-center border-b border-main-border-color bg-main-bg-color/95 backdrop-blur">
            <div className="flex items-center gap-4">
              <Logo />
              <div className="hidden md:flex text-[1.4rem] text-secondary-text-color">
                Workspaces
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button
                variation="secondary"
                onClick={() => {
                  navigate("/sign-in");
                }}
                className="flex rounded-3xl w-auto px-4"
              >
                <LogOutIcon /> <p className="hidden md:flex">Sair</p>
              </Button>
            </div>
          </header>
        </div>
        {children}
      </div>
    );
}

export default CompaniesLayout;
