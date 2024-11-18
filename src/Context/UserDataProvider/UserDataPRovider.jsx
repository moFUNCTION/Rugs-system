import React, { createContext, useContext } from "react";
import { useAuth } from "../../@Firebase/Hooks/Auth/useAuth/useAuth";
const UserContext = createContext();
export const UserDataProvider = ({ children }) => {
  const { user, HandleRender } = useAuth();
  return (
    <UserContext.Provider value={{ user, HandleRender }}>
      {children}
    </UserContext.Provider>
  );
};
export const useUserData = () => {
  return useContext(UserContext);
};
