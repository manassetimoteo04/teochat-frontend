import SignUpForm from "../components/sign-up-form";
function SignUpPage() {
  return (
    <div className="grid grid-cols-[1fr_50rem]">
      <div className="bg-[url('./img-3.jpg')] bg-cover h-screen"></div>
      <div>
        <SignUpForm />
      </div>
    </div>
  );
}

export default SignUpPage;
