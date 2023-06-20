import InputVerify from '@/components/reservePage/reservationTakeover/addGuests/inputVerify';
import { useCabinSelection } from '@/context/cabin-selection-context';
import styles from './addGuests.module.scss';
import clsx from 'clsx';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUser } from '@/context/user-context';

export default function AddGuests() {
  const { verifiedUsers, verifiedEmails, dispatch, actions } =
    useCabinSelection();
  const user = useUser();

  const numberOfVerifiedUsers = verifiedUsers.length;
  const hasMaximumGuests = numberOfVerifiedUsers >= 12;

  const removeUser = ({ currentUser }) => {
    return verifiedUsers.filter(
      user => user.emailAddress !== currentUser.emailAddress
    );
  };

  const removeEmail = ({ currentUser }) => {
    return verifiedEmails.filter(email => email !== currentUser.emailAddress);
  };

  return (
    <div className={styles.cabinSelectionContainer}>
      <div className={styles.column}>
        <div className={styles.titleContainer}>
          <p className={styles.title}>Add Guests (optional)</p>
        </div>
        <div className={styles.textContainer}>
          <p>
            If you would like to reserve a spot in your cabin on behalf of your
            friends or partners, please make sure they have purchased a ticket
            in advance, and verify their email address.
          </p>
        </div>
        {hasMaximumGuests ? (
          <p>Maximum 12 guests per cabin</p>
        ) : (
          <InputVerify />
        )}
      </div>
      <div className={clsx(styles.column, styles.right)}>
        <p className={styles.namesTitle}>Names on Reservation</p>
        {verifiedUsers.map((currentUser, index) => {
          return (
            <div
              className={styles.verifiedUserContainer}
              key={currentUser.name}
            >
              <p className={styles.verifiedUser}>
                <span className={styles.number}>{index + 1}.</span>
                {currentUser.name}
              </p>
              {currentUser.name !== user.name && (
                <button
                  className={styles.remove}
                  onClick={() =>
                    dispatch({
                      type: actions.REMOVE_GUEST,
                      verifiedUsers: removeUser({ currentUser }),
                      verifiedEmails: removeEmail({ currentUser }),
                    })
                  }
                >
                  <FontAwesomeIcon icon={faMinusCircle} />
                </button>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
