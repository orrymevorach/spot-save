import { ROUTES } from '@/utils/constants';
import Button from '../shared/button/button';
import styles from './hero.module.scss';
import HeadingText from '../shared/heading-text/heading-text';

export default function Hero() {
  return (
    <div className={styles.outerContainer}>
      <div className={styles.innerContainer}>
        <HeadingText isMedium classNames={styles.text}>
          Increased effeciency for your team,
        </HeadingText>
        <HeadingText isMedium classNames={styles.text}>
          ultimate flexibility for your guests.
        </HeadingText>

        <Button isInverted href={ROUTES.HOME} classNames={styles.button}>
          Get a demo
        </Button>
      </div>
    </div>
  );
}
