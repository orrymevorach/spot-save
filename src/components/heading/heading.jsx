import { useState } from 'react';
import styles from './heading.module.scss';
import clsx from 'clsx';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';

export default function Heading() {
  const data = ['Managing beds', 'Inputting payments', 'More stuff'];
  const [currentIndex, setIndex] = useState(0);
  setInterval(() => {
    if (currentIndex !== data.length - 1) {
      setIndex(currentIndex + 1);
      return;
    }
    if (currentIndex === data.length - 1) {
      setIndex(0);
      return;
    }
  }, 2500);

  return (
    <div className={styles.container}>
      <p className={styles.text}>Spend more time growing</p>
      <p className={styles.text}>your sales and less time</p>
      <div className={styles.animationContainer}>
        {data.map((line, index) => {
          if (currentIndex === index)
            return (
              <p className={clsx(styles.text, styles.slideUp)} key={line}>
                {line}
              </p>
            );
        })}
      </div>
      <Button isSecondary href={ROUTES.HOME} classNames={styles.button}>
        Get a demo
      </Button>
    </div>
  );
}
