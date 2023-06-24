import useUserReducer from '@/hooks/useUserReducer';
import { createContext, useContext } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const userReducer = useUserReducer();

  return (
    <UserContext.Provider value={userReducer}>{children}</UserContext.Provider>
  );
};
