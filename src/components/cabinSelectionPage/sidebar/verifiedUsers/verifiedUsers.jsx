import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './verifiedUsers.module.scss';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { useCabinSelection } from '@/context/cabin-selection-context';
import { useUser } from '@/context/user-context';

export default function VerifiedUsers() {
  const { verifiedUsers, verifiedEmails, dispatch, actions } =
    useCabinSelection();

  const user = useUser();
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
  );
}
