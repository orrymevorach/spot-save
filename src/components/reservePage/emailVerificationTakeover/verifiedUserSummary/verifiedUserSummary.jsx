import styles from './verifiedUserSummary.module.scss';

export default function VerifiedUserSummary({ user, guestNumber }) {
  return (
    <div className={styles.verifiedUser}>
      <p className={styles.label}>Guest {guestNumber}</p>
      <p>{user.name}</p>
    </div>
  );
}
