import styles from './cabinList.module.scss';
import CabinSelectionTile from '../../cabinSelectionTile/cabinSelectionTile';
import { useCabinSelection } from '@/context/cabin-selection-context';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronCircleDown } from '@fortawesome/free-solid-svg-icons';
import { useRef, useState } from 'react';
import {
  useFilters,
  FILTERS,
  GENDER_LABELS,
} from '../../../filters/filters-context';

const { AVAILABLE_BEDS, GENDER } = FILTERS;

const filterByGender = ({ cabins, selectedFilters }) => {
  const genderFilter = selectedFilters[GENDER];
  const { MALE, FEMALE, MIXED } = GENDER_LABELS;
  return cabins.filter(({ additionalInformation }) => {
    if (!additionalInformation || !genderFilter || genderFilter === MIXED)
      return true;
    const isMaleCabin = additionalInformation.includes(MALE);
    const isFemaleCabin = additionalInformation.includes(FEMALE);
    if (isMaleCabin && genderFilter === MALE) return true;
    if (isFemaleCabin && genderFilter === FEMALE) return true;
    return false;
  });
};

const filterByAvailableBeds = ({ cabins, selectedFilters }) => {
  const availableBedsFilter = selectedFilters[AVAILABLE_BEDS];
  return cabins.filter(({ openBeds }) => {
    if (openBeds >= availableBedsFilter) return true;
    return false;
  });
};

const sortByLeastAvailability = ({ cabins }) => {
  return cabins.sort((a, b) => {
    const aOpenBeds = parseFloat(a.openBeds);
    const bOpenBeds = parseFloat(b.openBeds);
    if (aOpenBeds > bOpenBeds) return 1;
    return -1;
  });
};

export default function CabinList({ unitData }) {
  const { dispatch, actions } = useCabinSelection();
  const [scrollValue, setScrollValue] = useState(0);
  const { selectedFilters } = useFilters();

  const [_, { cabins = [] }] = unitData;

  const handleSubmit = selectedCabin => {
    dispatch({
      type: actions.OPEN_CABIN_SELECTION,
      cabin: selectedCabin,
    });
  };
  const cabinListRef = useRef();

  const handleScrollDown = () => {
    cabinListRef.current.scrollTop = scrollValue + 150;
  };

  let filteredCabins = [];
  filteredCabins = filterByAvailableBeds({ cabins, selectedFilters });
  filteredCabins = filterByGender({ cabins: filteredCabins, selectedFilters });
  filteredCabins = sortByLeastAvailability({ cabins: filteredCabins });

  return (
    <div className={styles.cabinListOuterContainer}>
      <ul
        className={styles.cabinListInnerContainer}
        ref={cabinListRef}
        onScroll={e => setScrollValue(e.target.scrollTop)}
      >
        {filteredCabins.map(cabin => {
          return (
            <CabinSelectionTile
              cabin={cabin}
              key={`${cabin.unit}-${cabin.name}`}
              handleSelectCabin={() => handleSubmit(cabin)}
            />
          );
        })}
      </ul>
      <button className={styles.scrollDownButton} onClick={handleScrollDown}>
        <FontAwesomeIcon icon={faChevronCircleDown} size="3x" />
      </button>
    </div>
  );
}
