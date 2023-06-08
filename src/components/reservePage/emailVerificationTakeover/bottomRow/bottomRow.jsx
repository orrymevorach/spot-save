import { useState } from 'react';
import Button from '@/components/shared/button/button';
import { reserveSpotInCabin } from '@/lib/airtable';
import styles from './bottomRow.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';

export default function BottomRow() {
  const {
    selectedCabin,
    numberOfGuestsInReservation,
    dispatch,
    verifiedUsers,
    actions,
  } = useCabinSelection();

  const [isLoading, setIsLoading] = useState(false);

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfGuestsInReservation === 12;

  const reserveCabinForVerifiedUsers = async () => {
    setIsLoading(true);
    for (let i = 0; i < verifiedUsers.length; i++) {
      const user = verifiedUsers[i];
      const response = await reserveSpotInCabin({
        cabinId: selectedCabin.id,
        attendeeId: user.id,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.bottomRow}>
      {hasMaximumGuests ? (
        <p>Maximum 12 guests per cabin</p>
      ) : (
        <Button
          handleClick={() => dispatch({ type: actions.ADD_ADDITIONAL_GUEST })}
          classNames={styles.addGuest}
        >
          Add Guest +
        </Button>
      )}
      {numberOfGuestsInReservation > 1 && (
        <p>
          {numberOfVerifiedUsers}/{numberOfGuestsInReservation} emails verified
        </p>
      )}

      <Button isLoading={isLoading} handleClick={reserveCabinForVerifiedUsers}>
        Submit
      </Button>
    </div>
  );
}
