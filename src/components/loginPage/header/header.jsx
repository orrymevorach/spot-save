import Loader from '@/components/shared/loader/loader';
import Image from 'next/image';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import logo from 'public/Logo-1200px-No-Bkgd-min.png';
import styles from './header.module.scss';

export default function Header() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.headerContainer}>
        <Image src={logo} className={styles.image} alt="" />
      </div>
    </div>
  );
}
