import Dropdown from '@/components/shared/dropdown';
import styles from './filters.module.scss';
import { useCabinAndUnitData } from '@/context/cabin-and-unit-data-context';
import clsx from 'clsx';
import { FILTERS, GENDER_LABELS, useFilters } from './filters-context';

export default function Filters({ classNames = '' }) {
  const { selectedFilters, setSelectedFilters } = useFilters();
  const { units } = useCabinAndUnitData();
  const { MALE, FEMALE, MIXED } = GENDER_LABELS;

  const gender = [MALE, FEMALE, MIXED];
  const numberOfGuests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  const unitNames = units.map(([unitName]) => unitName);

  const handleChange = ({ event, label }) => {
    const selectedFiltersCopy = Object.assign({}, selectedFilters);
    selectedFiltersCopy[label] = event;
    setSelectedFilters(selectedFiltersCopy);
  };

  return (
    <div className={clsx(styles.filters, classNames)}>
      <p className={styles.title}>Filter by:</p>
      <Dropdown
        options={numberOfGuests}
        label={FILTERS.AVAILABLE_BEDS}
        variant="standard"
        handleChange={event => handleChange({ event, label: 'Available beds' })}
      />
      <Dropdown
        options={['All', ...unitNames]}
        label={FILTERS.UNIT}
        variant="standard"
        handleChange={event => handleChange({ event, label: 'Unit' })}
      />
      <Dropdown
        options={gender}
        label={FILTERS.GENDER}
        variant="standard"
        handleChange={event => handleChange({ event, label: 'Gender' })}
      />
    </div>
  );
}
