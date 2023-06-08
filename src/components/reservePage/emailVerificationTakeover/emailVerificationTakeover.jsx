import InputVerify from './inputVerify/inputVerify';
import styles from './emailVerificationTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import VerifiedUserSummary from './verifiedUserSummary/verifiedUserSummary';
import BottomRow from './bottomRow/bottomRow';

export default function EmailVerificationTakeover() {
  const { numberOfGuestsInReservation, verifiedUsers } = useCabinSelection();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const numberOfInputsToShow = Array.from(
    Array(numberOfGuestsInReservation - numberOfVerifiedUsers)
  );

  return (
    <div className={styles.container}>
      {verifiedUsers.map(currentUser => (
        <VerifiedUserSummary user={currentUser} key={currentUser.name} />
      ))}
      {numberOfInputsToShow.map((_, index) => {
        return <InputVerify key={`email-input-${index}`} index={index} />;
      })}
      <BottomRow />
    </div>
  );
}
