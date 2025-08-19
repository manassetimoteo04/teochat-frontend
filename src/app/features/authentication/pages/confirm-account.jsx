import ConfirmForm from "../components/confirm-form";
function ConfirmAccountPage() {
  return (
    <div className="grid h-screen overflow-hidden grid-cols-[1fr_50rem]">
      <div className="bg-[url('/workspace.jpg')] bg-cover h-screen"></div>
      <div className="h-screen overflow-hidden">
        <ConfirmForm />
      </div>
    </div>
  );
}

export default ConfirmAccountPage;
