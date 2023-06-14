import Loader from '@/components/shared/loader/loader';
import Image from 'next/image';
import Filters from '../filters/filters';
import UnitLinks from '../unitLinks/unitLinks';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import logo from 'public/Logo-1200px-No-Bkgd-min.png';
import styles from './header.module.scss';

export default function Header() {
  const { isLoading } = useGetCabinAndUnitData();
  if (isLoading)
    return (
      <div>
        <Image src={logo} className={styles.image} alt="" />
        <Loader isDotted />
      </div>
    );

  return (
    <div className={styles.outerContainer}>
      <div className={styles.headerContainer}>
        <Image src={logo} className={styles.image} alt="" />
        <Filters />
        <UnitLinks />
      </div>
    </div>
  );
}
