import { createContext, useContext } from "react";

export const LoggedIn = createContext<string>("");

export const useLoggedInContext = () => {
  const user = useContext(LoggedIn);

  // if (!user)
  //     throw new Error('No user authentificated');

  return user;
};
