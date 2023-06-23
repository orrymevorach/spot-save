import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './verifiedUsers.module.scss';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/context/user-context';
import { useReservation } from '@/context/reservation-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';

export default function VerifiedUsers() {
  const { verifiedUsers, verifiedEmails, dispatch, actions, currentStage } =
    useReservation();

  const { user } = useUser();

  if (verifiedUsers.length <= 1) return;

  const removeUser = ({ currentUser }) => {
    return verifiedUsers.filter(
      user => user.emailAddress !== currentUser.emailAddress
    );
  };

  const removeEmail = ({ currentUser }) => {
    return verifiedEmails.filter(email => email !== currentUser.emailAddress);
  };

  return (
    <div>
      <p className={styles.title}>Names on Reservation</p>
      {verifiedUsers.map((currentUser, index) => {
        return (
          <div className={styles.verifiedUserContainer} key={currentUser.name}>
            <p className={styles.verifiedUser}>
              <span className={styles.number}>{index + 1}.</span>
              {currentUser.name}
            </p>
            {currentUser.name !== user.name &&
            currentStage === CABIN_SELECTION_STAGES.ADD_GUESTS ? (
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
            ) : (
              ''
            )}
          </div>
        );
      })}
    </div>
  );
}
