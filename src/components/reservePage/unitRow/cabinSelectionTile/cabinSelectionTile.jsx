import styles from './cabinSelectionTile.module.scss';
import clsx from 'clsx';

export default function CabinSelectionTile({ cabin, handleSelectCabin }) {
  const { name, status, openBeds, totalBeds, additionalInformation } = cabin;
  const availability = status !== 'Full' ? 'Available' : 'Full';
  return (
    <li key={name} className={styles.cabinContainer}>
      <div className={styles.topRow}>
        <p className={styles.nameContainer}>
          Cabin Name: <span className={styles.name}>{name}</span>
        </p>
        <div className={styles.buttons}>
          <p className={clsx(styles.status, styles[availability])}>
            {availability}
          </p>
          {status !== 'Full' && (
            <button
              className={styles.reserveButton}
              onClick={() => handleSelectCabin(cabin)}
            >
              Reserve
            </button>
          )}
        </div>
      </div>

      <p>
        Available Beds: {openBeds} of {totalBeds}
      </p>
      {/* {additionalInformation?.length ? (
        <ul>
          Additional Information:
          {additionalInformation.map(info => (
            <p key={info}>{info}</p>
          ))}
        </ul>
      ) : (
        ''
      )} */}
    </li>
  );
}
