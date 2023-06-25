import Takeover from '@/components/shared/takeover/takeover';
import styles from './bedSelectionTakeover.module.scss';
import BedSelection from '@/components/shared/bedSelection/bedSelection';

export default function AddGuestsTakeover() {
  return (
    <Takeover>
      <div className={styles.takeover}>
        <BedSelection />
      </div>
    </Takeover>
  );
}
