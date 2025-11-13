import AuthLayout from "../components/auth-layout";
import SignUpForm from "../components/sign-up-form";
function SignUpPage() {
  return (
    <AuthLayout>
      <div>
        <SignUpForm />
      </div>
    </AuthLayout>
  );
}

export default SignUpPage;
