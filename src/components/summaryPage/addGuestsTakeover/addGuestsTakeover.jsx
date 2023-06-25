import Takeover from '@/components/shared/takeover/takeover';
import styles from './addGuestsTakeover.module.scss';
import AddGuests from '@/components/shared/addGuests/addGuests';
import VerifiedUsers from '@/components/cabinSelectionPage/sidebar/verifiedUsers/verifiedUsers';
import Button from '@/components/shared/button/button';
import ReserveButton from '@/components/cabinSelectionPage/sidebar/reserveButton/reserveButton';
import { useReservation } from '@/context/reservation-context';
import { useRouter } from 'next/router';
import { useUser } from '@/context/user-context';
import { ROUTES } from '@/utils/constants';

export default function AddGuestsTakeover() {
  const { dispatch, actions } = useReservation();
  const { user } = useUser();
  const cabinId = user.cabin && user.cabin[0].id;

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
          <AddGuests classNames={styles.addGuests} hideBackButton />
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
