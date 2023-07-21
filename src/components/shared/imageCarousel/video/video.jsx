import { faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './video.module.scss';

export default function Video({
  videoSrc,
  showVideoTakeover,
  setShowVideoTakeover,
}) {
  return (
    <>
      {!showVideoTakeover ? (
        <div className={styles.videoContainer}>
          <video autoPlay controls src={videoSrc} muted />
          <div className={styles.videoContent}>
            <p>Click to enlarge</p>
            <FontAwesomeIcon
              icon={faPlayCircle}
              size="5x"
              className={styles.playButtonIcon}
              onClick={() => setShowVideoTakeover(true)}
            />
          </div>
        </div>
      ) : (
        <FontAwesomeIcon icon={faPlayCircle} size="5x" />
      )}
    </>
  );
}
