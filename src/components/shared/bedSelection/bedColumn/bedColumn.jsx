import Bed from '../bed';
import styles from './bedColumn.module.scss';

export default function BedColumn({ beds, flip = false }) {
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
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
}
