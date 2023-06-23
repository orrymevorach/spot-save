import styles from './sidebar.module.scss';
import Summary from './sidebarSummary';
import VerifiedUsers from './verifiedUsers/verifiedUsers';

export default function Sidebar({ cabinData }) {
  return (
    <div className={styles.sidebar}>
      <Summary cabinData={cabinData} />
      <VerifiedUsers />
    </div>
  );
}
