import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import { ConversationContextProvider } from "./contexts/ConversationContextProvider";
import { DarkModeContextProvider } from "./contexts/DarkModeContext";

function App() {
  return (
    <BrowserRouter>
      <DarkModeContextProvider>
        <ConversationContextProvider>
          <AppRoutes />
        </ConversationContextProvider>
      </DarkModeContextProvider>
    </BrowserRouter>
  );
}

export default App;
