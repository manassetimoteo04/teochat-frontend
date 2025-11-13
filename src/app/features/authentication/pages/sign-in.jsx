import AuthLayout from "../components/auth-layout";
import SignInForm from "../components/sign-in-form";

function SignInPage() {
  return (
    <AuthLayout>
      <div className="h-screen overflow-hidden">
        <SignInForm />
      </div>
    </AuthLayout>
  );
}

export default SignInPage;
