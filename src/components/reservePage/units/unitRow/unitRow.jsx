import styles from './unitRow.module.scss';
import CabinSelectionTile from '../cabinSelectionTile/cabinSelectionTile';
import { useCabinSelection } from '@/context/cabin-selection-context';
import colors from 'public/colors.jpg';
import Image from 'next/image';

export default function UnitRow({ unitData }) {
  const { dispatch, actions } = useCabinSelection();

  const [unitName, { cabins = [] }] = unitData;
  const hasCabinData = cabins.length;

  const handleSubmit = selectedCabin => {
    dispatch({
      type: actions.OPEN_CABIN_SELECTION,
      cabin: selectedCabin,
    });
  };

  return (
    <div id={unitName}>
      <p className={styles.showUnitButton}>Unit: {unitName}</p>
      <div className={styles.unitContainer}>
        {!hasCabinData ? (
          <p>There are currently no cabins available in this unit</p>
        ) : (
          <ul className={styles.unitList}>
            {cabins
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
                    handleSelectCabin={() => handleSubmit(cabin)}
                  />
                );
              })}
          </ul>
        )}
        <Image
          src={colors}
          alt={`${unitName} unit`}
          className={styles.unitImage}
        />
      </div>
    </div>
  );
}
