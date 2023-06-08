import InputVerify from './inputVerify/inputVerify';
import styles from './emailVerificationTakeover.module.scss';
import { useCabinSelection } from '@/context/cabin-selection-context';
import VerifiedUserSummary from './verifiedUserSummary/verifiedUserSummary';
import BottomRow from './bottomRow/bottomRow';
import ImageCarousel from '@/components/shared/imageCarousel';

export default function EmailVerificationTakeover() {
  const { numberOfGuestsInReservation, verifiedUsers, selectedCabin } =
    useCabinSelection();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const numberOfInputsToShow = Array.from(
    Array(numberOfGuestsInReservation - numberOfVerifiedUsers)
  );

  return (
    <div className={styles.container}>
      <div className={styles.column}>
        {selectedCabin.images && (
          <ImageCarousel images={selectedCabin.images} />
        )}
      </div>
      <div className={styles.column}>
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
      </div>
      <BottomRow />
    </div>
  );
}
