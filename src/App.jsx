import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
<<<<<<< HEAD
=======
import { ConversationContextProvider } from "./contexts/ConversationContextProvider";
import { DarkModeContextProvider } from "./contexts/DarkModeContext";
>>>>>>> 26a9d0f (primeiro commit)

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <AppRoutes />
=======
      <DarkModeContextProvider>
        <ConversationContextProvider>
          <AppRoutes />
        </ConversationContextProvider>
      </DarkModeContextProvider>
>>>>>>> 26a9d0f (primeiro commit)
    </BrowserRouter>
  );
}

export default App;
