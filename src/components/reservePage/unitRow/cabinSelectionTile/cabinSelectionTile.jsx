import styles from './cabinSelectionTile.module.scss';
import clsx from 'clsx';

export default function CabinSelectionTile({ cabin, handleSelectCabin }) {
  const { name, status, openBeds, totalBeds, additionalInformation } = cabin;
  return (
    <li key={name} className={styles.cabinContainer}>
      <div className={styles.topRow}>
        <p className={styles.nameContainer}>
          Cabin Name: <span className={styles.name}>{name}</span>
        </p>
        <div className={styles.buttons}>
          {status !== 'Full' ? (
            <button
              className={styles.button}
              onClick={() => handleSelectCabin(cabin)}
            >
              Select
            </button>
          ) : (
            <p className={clsx(styles.button, styles.full)}>Full</p>
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
