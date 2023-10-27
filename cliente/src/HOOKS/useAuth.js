import { useContext } from "react";
import { AuthContext } from "./CONTEXT/useAuth";

const useAuth = () => {
  const context = useContext(AuthContext);

  return context;
};

export default useAuth;
