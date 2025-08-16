import { Toaster } from "sonner";

function ToastProvider() {
  return <Toaster position="top-center" duration={5000} richColors />;
}

export default ToastProvider;
