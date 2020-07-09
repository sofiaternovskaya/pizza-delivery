import { useCookies } from "react-cookie";
import createPersistedState from "./usePersistedState";
const useAuthState = createPersistedState("isAuthorised");

const useAuth = () => {
  const [cookies] = useCookies(["user"]);
  const [isAuthorised, setIsAuthorised] = useAuthState(Boolean(cookies.user));

  return {
    isAuthorised,
    toggleAuthorised: (newAuthState: boolean) => setIsAuthorised(newAuthState),
    clearAuth: () => setIsAuthorised(false),
  };
};

export default useAuth;
