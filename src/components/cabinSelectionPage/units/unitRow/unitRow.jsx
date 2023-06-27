import styles from './unitRow.module.scss';
import Image from 'next/image';
import Colours from 'public/Colours.jpg';
import Comics from 'public/comics.jpg';
import Zodiacs from 'public/zodiacs.jpg';
import Seekers from 'public/seekers.jpg';
import CITS from 'public/cits.jpg';
import lteam from 'public/l-team.jpg';
import CabinList from './cabinList/cabinList';

const unitImages = {
  Colours,
  Comics,
  Zodiacs,
  Seekers,
  CITS,
  ['L-Team']: lteam,
};

export default function UnitRow({ unitData }) {
  const [unitName, { cabins = [] }] = unitData;
  const hasCabinData = cabins.length;
  const unitImage = unitImages[unitName];

  return (
    <div id={unitName} className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <p className={styles.unitName}>Unit: {unitName}</p>
        <div className={styles.unitContainer}>
          {!hasCabinData ? (
            <p>There are currently no cabins available in this unit</p>
          ) : (
            <CabinList unitData={unitData} />
          )}
          <Image
            src={unitImage}
            alt={`${unitName} unit`}
            className={styles.unitImage}
          />
        </div>
      </div>
    </div>
  );
}
