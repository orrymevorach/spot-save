import styles from './bedSelection.module.scss';
import { useReservation } from '@/context/reservation-context';
import Button from '@/components/shared/button/button';
import BedColumn from './bedColumn/bedColumn';
import { reserveBedsMap } from '@/lib/airtable-bed-reservations';
import { useState } from 'react';

const leftBeds = [
  ['backBunkLeft'],
  ['backLoftLeft', 'frontLoftLeft'],
  ['backCotLeft', 'frontCotLeft'],
  ['frontBunkLeft'],
];

const rightBeds = [
  ['backBunkRight'],
  ['backLoftRight', 'frontLoftRight'],
  ['backCotRight', 'frontCotRight'],
  ['frontBunkRight'],
];

const Cabin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    cabinData: { cabin },
    selectedBeds,
  } = useReservation();

  const handleClick = async () => {
    setIsLoading(true);
    for (let i = 0; i < selectedBeds.length; i++) {
      const { bedName, userRecordId } = selectedBeds[i];
      const reserveFunction = reserveBedsMap[bedName];

      const response = await reserveFunction({
        cabinId: cabin.id,
        [bedName]: userRecordId,
      });
    }
    setIsLoading(false);
  };
  return (
    <div className={styles.container}>
      <p>Back of cabin</p>
      <div className={styles.bedsContainer}>
        <BedColumn beds={leftBeds} />
        <BedColumn beds={rightBeds} flip />
      </div>
      <p>Front door</p>
      <Button
        handleClick={handleClick}
        isLoading={isLoading}
        classNames={styles.confirmButton}
      >
        Confirm Beds
      </Button>
    </div>
  );
};

export default function BedSelection() {
  return <Cabin />;
}
