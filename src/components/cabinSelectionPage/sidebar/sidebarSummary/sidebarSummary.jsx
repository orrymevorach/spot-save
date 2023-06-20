import { useUser } from '@/context/user-context';
import styles from './sidebarSummary.module.scss';

export default function SidebarSummary() {
  const user = useUser();
  const hasSelection = user && user.cabin.length;
  const cabinName = hasSelection ? user.cabin[0].name : '--';
  const unit = hasSelection ? user.cabin[0].unit : '--';
  return (
    <div className={styles.summaryContainer}>
      <p>Summary</p>
      {hasSelection ? (
        <>
          <p>
            Selected cabin: {cabinName} in the {unit} unit
          </p>
        </>
      ) : (
        <p>Please make a selection</p>
      )}
    </div>
  );
}
