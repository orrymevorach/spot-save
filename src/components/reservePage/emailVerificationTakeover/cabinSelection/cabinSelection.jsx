import InputVerify from '@/components/reservePage/emailVerificationTakeover/inputVerify';
import { useCabinSelection } from '@/context/cabin-selection-context';
import VerifiedUserSummary from '@/components/reservePage/emailVerificationTakeover/verifiedUserSummary';
import Button from '@/components/shared/button/button';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './cabinSelection.module.scss';

export default function CabinSelection() {
  const { numberOfGuestsInReservation, dispatch, verifiedUsers, actions } =
    useCabinSelection();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfGuestsInReservation === 12;
  const numberOfInputsToShow = Array.from(
    Array(numberOfGuestsInReservation - numberOfVerifiedUsers)
  );
  return (
    <div className={styles.cabinSelectionContainer}>
      {verifiedUsers.map((currentUser, index) => (
        <VerifiedUserSummary
          user={currentUser}
          key={currentUser.name}
          guestNumber={index + 1}
        />
      ))}
      {numberOfInputsToShow.map((_, index) => {
        return <InputVerify key={`email-input-${index}`} index={index} />;
      })}
      {hasMaximumGuests ? (
        <p>Maximum 12 guests per cabin</p>
      ) : (
        <Button
          handleClick={() => dispatch({ type: actions.ADD_ADDITIONAL_GUEST })}
        >
          Add Guest <FontAwesomeIcon icon={faPlus} size="sm" />
        </Button>
      )}
      {numberOfGuestsInReservation > 1 && (
        <p>
          {numberOfVerifiedUsers}/{numberOfGuestsInReservation} emails verified
        </p>
      )}
    </div>
  );
}
