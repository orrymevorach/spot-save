import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image';
import styles from './thumbnails.module.scss';
import clsx from 'clsx';
import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';

export default function Thumbnails({ images = [], index, setIndex }) {
  return (
    <div className={styles.thumbnailsContainer}>
      {images.map(({ thumbnails, type }, thumbnailIndex) => {
        const isActive = thumbnailIndex === index;
        if (type === 'video/quicktime')
          return (
            <button
              key={`video-${index}`}
              className={clsx(styles.thumbnailButton, styles.videoThumbnail)}
              onClick={() => setIndex(thumbnailIndex)}
            >
              <FontAwesomeIcon
                icon={faPlayCircle}
                size="4x"
                className={styles.playIconThumbnail}
              />
            </button>
          );
        else
          return (
            <button
              key={thumbnails.large.url}
              className={styles.thumbnailButton}
              onClick={() => setIndex(thumbnailIndex)}
            >
              <Image
                src={thumbnails.large.url}
                alt=""
                width={thumbnails.large.width}
                height={thumbnails.large.height}
                className={clsx(
                  styles.thumbnailImage,
                  isActive && styles.activeThumbnail
                )}
              />
            </button>
          );
      })}
    </div>
  );
}
