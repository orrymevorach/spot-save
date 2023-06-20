import styles from './sidebar.module.scss';
import Summary from './sidebarSummary';
import VerifiedUsers from './verifiedUsers/verifiedUsers';

export default function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Summary />
      <VerifiedUsers />
    </div>
  );
}
