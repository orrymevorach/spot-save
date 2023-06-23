import { getUserByRecordId } from '@/lib/airtable';
import { COOKIES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userRecordCookie = Cookies.get(COOKIES.USER_RECORD);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      const userData = await getUserByRecordId({ id: userRecordCookie });
      setUser(userData);
      setIsLoading(false);
    };
    if (userRecordCookie) {
      loadUser();
    }
  }, [userRecordCookie]);
  return (
    <UserContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </UserContext.Provider>
  );
};
