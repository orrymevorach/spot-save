import { getUserByRecordId } from '@/lib/airtable';
import { useRouter } from 'next/router';
import { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export const useUser = () => useContext(UserContext);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const loadUser = async () => {
      const id = router.query.id;
      const userData = await getUserByRecordId({ id });
      setUser(userData);
    };
    if (router.query.id) {
      loadUser();
    }
  }, [router]);
  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};
