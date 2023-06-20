import styles from './layout.module.scss';
import Image from 'next/image';
import logo from 'public/Logo-1200px-No-Bkgd-min.png';
import clsx from 'clsx';

export const Logo = ({ classNames = ' ' }) => {
  return <Image src={logo} className={clsx(styles.image, classNames)} alt="" />;
};

export default function Layout({ children }) {
  return (
    <div>
      <Image src={logo} className={styles.image} alt="" />
      {children}
    </div>
  );
}
