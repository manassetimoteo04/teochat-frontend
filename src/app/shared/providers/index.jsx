import { CacheProvider } from "./cache";
import RoutesProvider from "./routes";
import ToastProvider from "./toast";

function AppProvider() {
  return (
    <CacheProvider>
      <ToastProvider />
      <RoutesProvider />
    </CacheProvider>
  );
}

export default AppProvider;
