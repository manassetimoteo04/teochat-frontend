import { useEffect } from "react";
import { useSession } from "../hooks/use-session";
import { useAppContext } from "../providers/context";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "./full-page-spinner";
function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { session, isPending } = useSession();
  const { dispatch } = useAppContext();
  useEffect(() => {
    if (session) {
      if (session.user && session.company) {
        dispatch({ type: "SET_USER", payload: session.user });
        dispatch({ type: "SET_COMPANY", payload: session.company });
        dispatch({ type: "SET_ROLE", payload: session.role });
      }
      if (session.user && !session.company && !isPending) {
        navigate("/companies", { replace: true });
      }
      if (!session.user && !session.company && !isPending) {
        navigate("/sign-in", { replace: true });
      }
    }
    if (!session && !isPending) navigate("/sign-in", { replace: true });
  }, [session, navigate, dispatch, isPending]);

  if (isPending) return <FullPageSpinner />;
  if (session && session.user && session.company && !isPending) return children;
}

export default ProtectedRoute;
