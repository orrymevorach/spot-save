import { useState } from 'react';
import styles from './heading.module.scss';
import Button from '@/components/shared/button/button';
import { ROUTES } from '@/utils/constants';
import HeadingText from '../shared/heading-text/heading-text';
import useInterval from '@/hooks/useInterval';
import Pill from '../shared/pill/pill';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

export default function Heading() {
  const data = ['managing beds', 'inputting payments', 'more stuff'];
  const [currentIndex, setIndex] = useState(0);
  useInterval(() => {
    if (currentIndex !== data.length - 1) {
      setIndex(currentIndex + 1);
      return;
    } else if (currentIndex === data.length - 1) {
      setIndex(0);
      return;
    }
  }, 2500);
  return (
    <div className={styles.container}>
      <Pill
        text="More features coming soon"
        icon={faPlane}
        classNames={styles.pill}
      />
      <HeadingText>Spend more time growing</HeadingText>
      <HeadingText>your sales and less time</HeadingText>
      <div className={styles.animationContainer}>
        {data.map((line, index) => {
          if (currentIndex === index)
            return (
              <HeadingText key={line} classNames={styles.slideUp}>
                {line}
              </HeadingText>
            );
        })}
      </div>
      <Button isSecondary href={ROUTES.HOME} classNames={styles.button}>
        Get a demo
      </Button>
    </div>
  );
}
