import Dropdown from '@/components/shared/dropdown';
import styles from './filters.module.scss';
import useGetCabinAndUnitData from '@/hooks/useGetCabinAndUnitData';
import clsx from 'clsx';

export default function Filters({ classNames = '' }) {
  const { units } = useGetCabinAndUnitData();

  const gender = ['Male', 'Female', 'Mixed'];
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const unitNames = units.map(([unitName]) => unitName);
  return (
    <div className={clsx(styles.filters, classNames)}>
      <p>Filter by:</p>
      <Dropdown
        options={numberOfGuests}
        label="Number of guests"
        variant="standard"
      />
      <Dropdown options={unitNames} label="Unit" variant="standard" />
      <Dropdown options={gender} label="Gender" variant="standard" />
    </div>
  );
}
