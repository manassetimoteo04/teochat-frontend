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
      <div className="bg-main-bg-color overflow-scroll relative  h-screen">
        <div>
          <header className="md:p-[2rem_4rem] bg-gradient-to-t from-transparent to-main-bg-color p-[2rem] top-0 left-0 w-full h-[8rem] fixed flex justify-between items-center">
            <Logo />
            <div>
              <Button
                variation="secondary"
                onClick={() => {
                  navigate("/sign-in");
                }}
                className="bg-blue-700 flex  rounded-3xl"
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
