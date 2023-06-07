import styles from './selectionSummary.module.scss';
import { useUser } from '@/context/user-context';

export default function SelectionSummary() {
  const user = useUser();
  if (!user) return;
  const cabinName = user.cabins[0]?.name;
  const unit = user.cabins[0]?.unit;
  return (
    <div className={styles.selectionContainer}>
      {cabinName ? (
        <p>
          You are in cabin {cabinName} in the {unit} unit
        </p>
      ) : (
        <p>
          Welcome Highlands attendee! You have not yet selected a cabin, please
          select one from the list below.
        </p>
      )}
    </div>
  );
}
