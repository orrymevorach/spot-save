import styles from './layout.module.scss';
import Image from 'next/image';
import clsx from 'clsx';
import Nav from '../nav/nav';

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
  return (
    <div className={styles.container}>
      <Nav
        navData={[
          {
            label: 'My Reservation',
            isButton: true,
            isAnchor: true,
          },
          {
            label: 'Log Out',
            isButton: true,
          },
        ]}
      />

      {/* <Logo  className={styles.image} alt="" quality={50} /> */}

      {children}
    </div>
  );
}
