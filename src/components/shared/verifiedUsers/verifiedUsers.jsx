import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './verifiedUsers.module.scss';
import { faMinusCircle } from '@fortawesome/free-solid-svg-icons';
import { useUser } from '@/context/user-context';
import { useReservation } from '@/context/reservation-context';
import clsx from 'clsx';

export default function VerifiedUsers({ hideRemoveButton }) {
  const { dispatch, actions, groupData } = useReservation();
  const { user } = useUser();

  return (
    <div>
      <p className={styles.title}>Names on Reservation</p>
      {groupData.members.map((currentUser, index) => {
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
            {!isLoggedInUser && hideRemoveButton ? (
              <button
                className={styles.remove}
                onClick={() =>
                  dispatch({
                    type: actions.REMOVE_GUEST,
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
