import useWindowSizeHook from '@/hooks/useWindowSize';
import { createContext, useContext } from 'react';

const WindowSizeContext = createContext();

export const useWindowSize = () => useContext(WindowSizeContext);

export const WindowSizeProvider = ({ children }) => {
  const windowSizeData = useWindowSizeHook();
  return (
    <WindowSizeContext.Provider value={windowSizeData}>
      {children}
    </WindowSizeContext.Provider>
  );
};
