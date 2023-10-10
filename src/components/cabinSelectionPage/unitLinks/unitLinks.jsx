import { useCabinAndUnitData } from '@/context/cabin-and-unit-data-context';
import styles from './unitLinks.module.scss';
import clsx from 'clsx';

export default function UnitLinks({ classNames = '' }) {
  const { units } = useCabinAndUnitData();
  return (
    <div className={clsx(styles.container, classNames)}>
      <p className={styles.title}>Skip to:</p>
      {units.map(({ name: unitName }) => {
        const unitNameWithoutTrailingS = unitName.slice(0, -1);
        return (
          <a
            key={`links-${unitName}`}
            href={`#${unitName}`}
            className={styles.link}
          >
            {unitNameWithoutTrailingS} Unit
          </a>
        );
      })}
    </div>
  );
}
