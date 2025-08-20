import { CacheProvider } from "./cache";
import AppContextProvider from "./context";
import RoutesProvider from "./routes";
import ToastProvider from "./toast";

function AppProvider() {
  return (
    <CacheProvider>
      <ToastProvider />
      <AppContextProvider>
        <RoutesProvider />
      </AppContextProvider>
    </CacheProvider>
  );
}

export default AppProvider;
