import Dropdown from '@/components/shared/dropdown';
import styles from './filters.module.scss';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import Image from 'next/image';
import logo from 'public/Logo-1200px-No-Bkgd-min.png';

export default function Filters({ mainSectionRef }) {
  const { units } = useGetCabinAndUnitData();

  const gender = ['Male', 'Female', 'Mixed'];
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const unitNames = units.map(([unitName]) => unitName);
  return (
    <>
      <div className={styles.topRow} ref={mainSectionRef}>
        <Image src={logo} className={styles.image} alt="" />
      </div>
      <div className={styles.filters}>
        <Dropdown options={unitNames} label="Units" variant="standard" />
        <Dropdown
          options={numberOfGuests}
          label="Number of guests"
          variant="standard"
        />
        <Dropdown options={gender} label="Gender" variant="standard" />
      </div>
    </>
  );
}
