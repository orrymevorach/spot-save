import Takeover from '@/components/shared/takeover/takeover';
import styles from './addGuestsTakeover.module.scss';
import AddGuests from '@/components/shared/addGuests/addGuests';
import Button from '@/components/shared/button/button';
import ReserveButton from '@/components/shared/reserveButton';
import { useReservation } from '@/context/reservation-context';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/utils/constants';
import VerifiedUsers from '@/components/shared/verifiedUsers';

export default function AddGuestsTakeover() {
  const { dispatch, actions } = useReservation();
  const { user } = useUser();
  const cabin = user.cabin && user.cabin[0];
  const cabinId = cabin && cabin.id;

  const router = useRouter();
  const handleClose = () => {
    dispatch({ type: actions.SET_SELECTION_STAGE });
    router.push({ pathname: ROUTES.SUMMARY }, undefined, {
      shallow: true,
    });
  };
  return (
    <>
      <Takeover handleClose={handleClose}>
        <div className={styles.takeover}>
          <AddGuests
            cabin={cabin}
            classNames={styles.addGuests}
            hideBackButton
          />
          <VerifiedUsers />
        </div>
        <div className={styles.bottomRow}>
          <Button handleClick={handleClose} classNames={styles.cancelButton}>
            Cancel
          </Button>
          <ReserveButton cabinId={cabinId}>
            {'Update Reservation'}
          </ReserveButton>
        </div>
      </Takeover>
    </>
  );
}
