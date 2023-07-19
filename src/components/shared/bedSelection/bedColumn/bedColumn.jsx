import Bed from '../bed';
import styles from './bedColumn.module.scss';

export default function BedColumn({ beds, flip = false, readOnly, cabin }) {
  return (
    <div className={styles.column}>
      {beds.map((row, index) => {
        return (
          <div key={`row-${index}`} className={styles.row}>
            {row.map(bed => {
              return (
                <Bed
                  key={bed}
                  bedName={bed}
                  classNames={styles.bed}
                  flip={flip}
                  readOnly={readOnly}
                  cabin={cabin}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
