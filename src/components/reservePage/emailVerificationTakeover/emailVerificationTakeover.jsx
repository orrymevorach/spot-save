import { useState } from 'react';
import InputVerify from './inputVerify/inputVerify';
import Button from '@/components/shared/button/button';
import { getUserByEmail, reserveSpotInCabin } from '@/lib/airtable';
import styles from './emailVerificationTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';

export default function EmailVerificationTakeover() {
  const {
    selectedCabin,
    numberOfGuestsInReservation,
    dispatch,
    verifiedEmails,
    actions,
  } = useCabinSelection();

  const [isLoading, setIsLoading] = useState(false);

  const quantityAsArray = Array.from(Array(numberOfGuestsInReservation));
  const numberOfVerifiedEmails = verifiedEmails.length;

  const reserveCabinForVerifiedUsers = async () => {
    setIsLoading(true);
    for (let i = 0; i < numberOfVerifiedEmails; i++) {
      const email = verifiedEmails[i];
      const userResponse = await getUserByEmail({ email });
      const response = await reserveSpotInCabin({
        cabinId: selectedCabin.id,
        attendeeId: userResponse.id,
      });
    }
    setIsLoading(false);
  };

  return (
    <div className={styles.container}>
      {quantityAsArray.map((_, index) => {
        return <InputVerify key={`email-input-${index}`} index={index} />;
      })}
      <Button
        handleClick={() => dispatch({ type: actions.ADD_ADDITIONAL_GUEST })}
      >
        Add Guest +
      </Button>
      {numberOfVerifiedEmails}/{numberOfGuestsInReservation} emails verified
      {numberOfVerifiedEmails === numberOfGuestsInReservation && (
        <Button
          isLoading={isLoading}
          handleClick={reserveCabinForVerifiedUsers}
        >
          Submit
        </Button>
      )}
    </div>
  );
}
