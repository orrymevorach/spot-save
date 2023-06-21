import styles from './layout.module.scss';
import Image from 'next/image';
import logo from 'public/Logo-1200px-No-Bkgd-min.png';
import clsx from 'clsx';
import Button from '../button/button';
import { useState } from 'react';
import Cookies from 'js-cookie';
import { COOKIES, ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';

export const Logo = ({ classNames = ' ' }) => {
  return <Image src={logo} className={clsx(styles.image, classNames)} alt="" />;
};

export default function Layout({ children }) {
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const router = useRouter();
  const { user, setUser } = useUser();
  const handleLogout = () => {
    setIsLogoutLoading(true);
    setTimeout(() => {
      Cookies.remove(COOKIES.USER_RECORD);
      setUser(null);
      router.push(ROUTES.HOME);
      setIsLogoutLoading(false);
    }, 300);
  };
  return (
    <div className={styles.container}>
      {user && (
        <Button
          isLoading={isLogoutLoading}
          handleClick={handleLogout}
          classNames={styles.logoutButton}
        >
          Log out
        </Button>
      )}

      <Image src={logo} className={styles.image} alt="" />
      {children}
    </div>
  );
}
