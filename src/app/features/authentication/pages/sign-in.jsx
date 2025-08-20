import SignInForm from "../components/sign-in-form";

function SignInPage() {
  return (
    <div className="grid h-screen overflow-hidden grid-cols-[1fr_50rem]">
      <div className="bg-[url('./img-3.jpg')] bg-cover h-screen"></div>
      <div className="h-screen overflow-hidden">
        <SignInForm />
      </div>
    </div>
  );
}

export default SignInPage;
