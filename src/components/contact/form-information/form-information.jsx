import Image from 'next/image';
import logo from 'public/reserved.png';
import HeadingText from '@/components/shared/heading-text/heading-text';
import Pill from '@/components/shared/pill/pill';
import styles from './form-information.module.scss';
import { faCheck } from '@fortawesome/free-solid-svg-icons';

export default function FormInformation() {
  return (
    <div className={styles.graphicContainer}>
      <Image src={logo} alt="Logo" className={styles.logo} />
      <div className={styles.headingContainer}>
        <HeadingText>Take your booking experience</HeadingText>
        <HeadingText>to the next level</HeadingText>
      </div>
      <Pill
        classNames={styles.pill}
        text="Allow guests to select specific beds in a dorm"
        iconSide="left"
        icon={faCheck}
      />
      <Pill
        classNames={styles.pill}
        text="Send reminder emails 48 hours prior to arrival"
        iconSide="left"
        icon={faCheck}
      />
      <Pill
        classNames={styles.pill}
        text="Collect payment at time of booking"
        iconSide="left"
        icon={faCheck}
      />
    </div>
  );
}
