import { getUserByRecordId } from '@/lib/airtable';
import { COOKIES } from '@/utils/constants';
import Cookies from 'js-cookie';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const userRecordCookie = Cookies.get(COOKIES.USER_RECORD);

  useEffect(() => {
    const loadUser = async () => {
      const userData = await getUserByRecordId({ id: userRecordCookie });
      setUser(userData);
    };
    if (userRecordCookie) {
      loadUser();
    }
  }, [userRecordCookie]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
