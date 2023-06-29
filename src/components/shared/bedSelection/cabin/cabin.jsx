import BedColumn from '../bedColumn/bedColumn';
import styles from './cabin.module.scss';

const leftBeds = [
  ['backBunkLeft'],
  ['backLoftLeft', 'frontLoftLeft'],
  ['backCotLeft', 'frontCotLeft'],
  ['frontBunkLeft'],
];

const rightBeds = [
  ['backBunkRight'],
  ['backLoftRight', 'frontLoftRight'],
  ['backCotRight', 'frontCotRight'],
  ['frontBunkRight'],
];

export const bedList = [
  'backBunkLeft',
  'backLoftLeft',
  'frontLoftLeft',
  'backCotLeft',
  'frontCotLeft',
  'frontBunkLeft',
  'backBunkRight',
  'backLoftRight',
  'frontLoftRight',
  'backCotRight',
  'frontCotRight',
  'frontBunkRight',
];

export default function Cabin() {
  return (
    <div className={styles.cabinContainer}>
      <p>Back of cabin</p>
      <div className={styles.bedColumnsContainer}>
        <BedColumn beds={leftBeds} />
        <BedColumn beds={rightBeds} flip />
      </div>
      <p>Front door</p>
    </div>
  );
}
