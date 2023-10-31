import { faBoltLightning } from '@fortawesome/free-solid-svg-icons';
import styles from './features.module.scss';
import Pill from '../shared/pill/pill';
import HeadingText from '../shared/heading-text/heading-text';
import InformationContainer from './information/information';

const information = [
  {
    heading: 'Custom room configuration',
    description:
      'We will work with you to create custom bed selection graphics, so that the layout of the beds in each room matches the layout in real life',
  },
  {
    heading: 'Easily configure rooms',
    description:
      'Manage room descriptions and images through a user-friendly content management system',
  },
  {
    heading: 'Collect payments instantly',
    description:
      'Collect payments right at checkout, or give customers the option to pay a deposit',
  },
  {
    heading: 'Automatic emails',
    description:
      'Confirmation emails will be sent at time of booking, and check-in emails will be sent 48 hours prior to arrival',
  },
];

export default function Features() {
  return (
    <div className={styles.container}>
      <Pill
        text="Core features"
        icon={faBoltLightning}
        classNames={styles.pill}
      />
      <HeadingText isMedium classNames={styles.headingText}>
        Hostel bookings have <br />
        <span className={styles.greenText}>never been easier</span> than this.
      </HeadingText>
      <div className={styles.featuresContainer}>
        {information.map(props => (
          <InformationContainer {...props} key={props.heading} />
        ))}
      </div>
    </div>
  );
}
