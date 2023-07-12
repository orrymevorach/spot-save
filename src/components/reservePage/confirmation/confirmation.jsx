import styles from './confirmation.module.scss';
import Button from '@/components/shared/button/button';
import { CABIN_SELECTION_STAGES } from '@/hooks/useReservation';
import { ROUTES } from '@/utils/constants';
import { useRouter } from 'next/router';

export default function Confirmation() {
  const router = useRouter();
  return (
    <div className={styles.container}>
      <p className={styles.title}>Confirmed!</p>
      <p className={styles.text}>
        You are all done! If you would like to select a specific bed in your
        cabin, please click the button below.
      </p>
      <p className={styles.text}>
        We have sent a confirmation email with your reservation details to all
        guests on the reservation.
      </p>
      <p className={styles.text}>See you at Highlands!</p>
      <div className={styles.buttonsContainer}>
        <Button classNames={styles.button} href={ROUTES.SUMMARY}>
          View summary
        </Button>
        <Button
          classNames={styles.button}
          handleClick={() =>
            router.push({
              pathname: ROUTES.SUMMARY,
              query: {
                stage: CABIN_SELECTION_STAGES.BED_SELECTION,
              },
            })
          }
        >
          Continue to bed selection
        </Button>
      </div>
    </div>
  );
}
