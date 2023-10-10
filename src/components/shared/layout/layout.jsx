import styles from './layout.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import Cookies from 'js-cookie';
import { COOKIES, ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';
import Nav from '../nav/nav';
import { useConfig } from '@/context/config-context';

export const Logo = ({ classNames = '', url, height, width, quality }) => {
  return (
    <Image
      src={url}
      className={clsx(styles.image, classNames)}
      alt="Logo"
      height={height}
      width={width}
      quality={quality || 60}
    />
  );
};

export default function Layout({ children }) {
  const router = useRouter();
  const { user, dispatch } = useUser();
  const config = useConfig();
  if (!config) return;

  const handleLogout = () => {
    Cookies.remove(COOKIES.USER_RECORD);
    dispatch({ type: 'LOG_OUT' });
    window.location = '/';
  };

  const isSummaryPage = router.pathname === ROUTES.SUMMARY;
  const hasCabin = user?.cabin && user.cabin.length > 0;
  return (
    <div
      className={styles.container}
      style={{ backgroundColor: config.backgroundColour }}
    >
      {user && (
        <Nav
          navData={[
            {
              label: 'My Reservation',
              isButton: true,
              isShowing: !isSummaryPage && hasCabin,
              url: ROUTES.SUMMARY,
              isAnchor: true,
            },
            {
              label: 'Log Out',
              isButton: true,
              handleClick: handleLogout,
            },
          ]}
        />
      )}

      <Logo {...config.logo[0]} className={styles.image} alt="" quality={50} />

      {children}
    </div>
  );
}
