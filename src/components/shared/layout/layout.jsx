import styles from './layout.module.scss';
import Image from 'next/image';
import logo from 'public/Logo-1200px-No-Bkgd-min.png';

export default function Layout({ children }) {
  return (
    <div>
      <Image src={logo} className={styles.image} alt="" />
      {children}
    </div>
  );
}
