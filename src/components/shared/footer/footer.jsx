import { ROUTES } from '@/utils/constants';
import styles from './footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.container}>
      <div className={styles.innerContainer}>
        <p className={styles.text}>Spot Save 2023</p>
        <a href={ROUTES.CONTACT}>
          <p className={styles.text}>Contact</p>
        </a>
      </div>
    </footer>
  );
}
