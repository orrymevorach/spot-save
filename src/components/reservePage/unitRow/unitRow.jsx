import { useState } from 'react';
import styles from './unitRow.module.scss';
import CabinSelectionTile from './cabinSelectionTile/cabinSelectionTile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export default function UnitRow({ unitData, handleSubmit, bedQuantity }) {
  const [showCabins, setShowCabins] = useState(true);

  const [unitName, { cabins = [] }] = unitData;
  const hasCabinData = cabins.length;

  const icon = showCabins ? faChevronUp : faChevronDown;

  return (
    <div>
      <button
        className={styles.unit}
        onClick={() => setShowCabins(!showCabins)}
      >
        {unitName} <FontAwesomeIcon icon={icon} size="sm" />
      </button>
      {showCabins && !hasCabinData ? (
        <p>There are currently no cabins available in this unit</p>
      ) : showCabins && hasCabinData ? (
        <ul>
          {cabins
            .filter(cabin => {
              const openBeds = parseFloat(cabin.openBeds);
              if (bedQuantity <= openBeds) return true;
              return false;
            })
            .sort((a, b) => {
              const aOpenBeds = parseFloat(a.openBeds);
              const bOpenBeds = parseFloat(b.openBeds);
              if (aOpenBeds > bOpenBeds) return -1;
              return 1;
            })
            .map(cabin => {
              return (
                <CabinSelectionTile
                  cabin={cabin}
                  key={`${cabin.unit}-${cabin.name}`}
                  handleSelectCabin={() => handleSubmit(selectedCabin)}
                />
              );
            })}
        </ul>
      ) : (
        ''
      )}
    </div>
  );
}
