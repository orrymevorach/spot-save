import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './verifiedUsers.module.scss';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/context/user-context';
import { useReservation } from '@/context/reservation-context';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import clsx from 'clsx';

export default function VerifiedUsers() {
  const { verifiedUsers, verifiedEmails, dispatch, actions, currentStage } =
    useReservation();

  const { user } = useUser();

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
        const isLoggedInUser = currentUser.name === user.name;
        return (
          <div className={styles.verifiedUserContainer} key={currentUser.name}>
            <p
              className={clsx(
                styles.verifiedUser,
                !isLoggedInUser && styles.nonActiveUser
              )}
            >
              <span className={styles.number}>{index + 1}.</span>
              {currentUser.name}
            </p>
            {!isLoggedInUser &&
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
