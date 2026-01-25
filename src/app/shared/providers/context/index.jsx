import { createContext, useContext, useReducer } from "react";

const ContextProvider = createContext();
const initialState = {
  currentUser: null,
  currentCompany: null,
  currentRole: null,
};
function reducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "SET_COMPANY":
      return {
        ...state,
        currentCompany: action.payload,
      };
    case "SET_ROLE":
      return {
        ...state,
        currentRole: action.payload,
      };
    case "RESET":
      return initialState;

    default:
      return state;
  }
}
function AppContextProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const values = {
    ...state,
    dispatch,
  };

  return (
    <ContextProvider.Provider value={values}>
      {children}
    </ContextProvider.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => {
  const context = useContext(ContextProvider);
  if (!context) throw new Error("A context was used outside the provider");
  return context;
};
export default AppContextProvider;
