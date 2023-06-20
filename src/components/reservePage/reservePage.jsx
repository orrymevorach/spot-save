import Sidebar from '../cabinSelectionPage/sidebar/sidebar';
import { Logo } from '../shared/layout/layout';
import AddGuests from './addGuests/addGuests';
import styles from './reservePage.module.scss';

export default function ReservePage() {
  return (
    <div className={styles.sideMargins}>
      <Logo classNames={styles.logo} />
      <div className={styles.container}>
        <AddGuests />
        <Sidebar />
      </div>
    </div>
  );
}
