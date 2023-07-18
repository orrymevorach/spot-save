import InputVerify from './inputVerify/inputVerify';
import styles from './addGuests.module.scss';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';

const getErrorMessage = ({ numberOfOpenBeds, numberOfGroupMembers }) => {
  const isCabinFull = numberOfOpenBeds === 0;
  const hasRoom = numberOfOpenBeds > numberOfGroupMembers;
  if (isCabinFull)
    return 'This cabin is full. Please select a different cabin.';
  else if (!hasRoom)
    return 'There are not enough beds in this cabin for your entire group.';
  else
    return 'We apologize, this cabin cannot be reserved right now. If you specifically want to request this cabin, please contact info@highlandsmusicfestival.ca.';
};

export default function AddGuests({ cabin, classNames = '' }) {
  const { groupData } = useReservation();

  if (!cabin) return;
  const numberOfOpenBeds = cabin.openBeds;

  const numberOfGroupMembers = groupData.members.length;
  const hasRoom = numberOfOpenBeds > numberOfGroupMembers;

  const errorMessage = getErrorMessage({
    numberOfOpenBeds,
    numberOfGroupMembers,
  });

  return (
    <div className={clsx(styles.container, classNames)}>
      <p className={styles.title}>Add Guests (optional)</p>
      <p className={styles.text}>
        If you would like to reserve a spot in your cabin on behalf of your
        friends or partners, please make sure they have purchased a ticket in
        advance, and verify their email address.
      </p>
      {hasRoom ? (
        <div className={styles.input}>
          <InputVerify />
        </div>
      ) : (
        <div className={styles.input}>
          <p>{errorMessage}</p>
        </div>
      )}
    </div>
  );
}
