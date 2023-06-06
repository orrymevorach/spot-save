import { getUser } from '@/lib/airtable';
import { useState } from 'react';
import styles from './loginPage.module.scss';
import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import Loader from '../shared/loader/loader';
import { COOKIES, ROUTES } from '@/utils/constants';

const useLoginExistingUserOnPageLoad = () => {
  const router = useRouter();
  useEffect(() => {
    const userRecordCookie = Cookies.get(COOKIES.USER_RECORD);
    if (userRecordCookie) {
      router.push({
        pathname: ROUTES.RESERVE,
        query: {
          id: userRecordCookie,
        },
      });
    }
  }, [router]);
};

export default function Login() {
  const [email, setEmail] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  useLoginExistingUserOnPageLoad();

  const handleSubmit = async e => {
    e.preventDefault();
    setIsLoading(true);
    setShowError(false);
    const user = await getUser({ email });
    if (user?.id) {
      setIsLoading(false);
      Cookies.set(COOKIES.USER_RECORD, user.id);
      router.push({
        pathname: ROUTES.RESERVE,
        query: {
          id: user.id,
        },
      });
    } else {
      setIsLoading(false);
      setShowError(true);
    }
  };

  if (isLoading) return <Loader />;

  return (
    <form action="#" onSubmit={e => handleSubmit(e)} className={styles.login}>
      <label htmlFor="email">Please enter your email</label>
      {showError && (
        <p className={styles.error}>
          We do not have a record of this email. Please buy a ticket or contact
          info@highlandsmusicfestival.ca
        </p>
      )}
      <input
        type="email"
        id="email"
        name="email"
        onChange={e => setEmail(e.target.value)}
      />
      <input type="submit" />
    </form>
  );
}
