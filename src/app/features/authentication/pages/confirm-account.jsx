import AuthLayout from "../components/auth-layout";
import ConfirmForm from "../components/confirm-form";
function ConfirmAccountPage() {
  return (
    <AuthLayout>
      <div className="h-screen overflow-hidden">
        <ConfirmForm />
      </div>
    </AuthLayout>
  );
}

export default ConfirmAccountPage;
