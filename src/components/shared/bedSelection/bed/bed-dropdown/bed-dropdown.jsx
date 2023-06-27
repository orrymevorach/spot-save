import { useState } from 'react';
import styles from './bed-dropdown.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';

export default function BedDropdown({
  options,
  handleChange,
  classNames,
  value,
  label,
}) {
  const [showDropdown, setShowDropdown] = useState(false);
  const icon = showDropdown ? faChevronUp : faChevronDown;

  return (
    <div
      onClick={() => setShowDropdown(!showDropdown)}
      className={clsx(styles.bedDropdown, classNames)}
    >
      <div
        className={clsx(
          styles.inputContainer,
          showDropdown && styles.activeBorder
        )}
      >
        {value ? <p className={styles.bold}>{value}</p> : <p>{label}</p>}

        <FontAwesomeIcon icon={icon} />
      </div>
      {showDropdown && (
        <ul className={styles.list}>
          {options.map(option => {
            return (
              <li key={option} className={styles.listItem}>
                <button onClick={() => handleChange(option)}>{option}</button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
