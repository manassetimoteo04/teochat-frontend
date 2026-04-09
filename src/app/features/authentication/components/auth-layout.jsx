import { useEffect } from "react";
import { useSession } from "../../../shared/hooks/use-session";
import Spinner from "../../../shared/ui/Spinner";
import { useNavigate } from "react-router-dom";
import FullPageSpinner from "../../../shared/ui/full-page-spinner";

function AuthLayout({ children }) {
  const { session, isPending } = useSession();
  const navigate = useNavigate();
  useEffect(() => {
    if (session && session?.isConfirmed && !isPending) {
      navigate("/companies");
    }
  }, [session, isPending, navigate]);
  if (isPending) return <FullPageSpinner />;

  if (!isPending)
    return (
      <div className="grid h-screen overflow-hidden lg:grid-cols-[1fr_50rem]">
        <div className=" p-[2rem] hidden lg:flex bg-[rgb(3,194,73)] h-screen  items-center justify-center">
          <img src="/ilustration2.png" className="h-[100%] object-cover " />
        </div>
        {children}
      </div>
    );
}

export default AuthLayout;
