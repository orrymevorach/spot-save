import styles from './unitRow.module.scss';
import CabinSelectionTile from '../cabinSelectionTile/cabinSelectionTile';
import { useCabinSelection } from '@/context/cabin-selection-context';
import Image from 'next/image';
import Colors from 'public/colors.jpg';
import Comics from 'public/comics.jpg';
import Zodiacs from 'public/zodiacs.jpg';
import Seekers from 'public/seekers.jpg';
import CITS from 'public/cits.jpg';
import lteam from 'public/l-team.jpg';

const unitImages = {
  Colors,
  Comics,
  Zodiacs,
  Seekers,
  CITS,
  ['L-Team']: lteam,
};

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
  const unitImage = unitImages[unitName];
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
          src={unitImage}
          alt={`${unitName} unit`}
          className={styles.unitImage}
        />
      </div>
    </div>
  );
}
