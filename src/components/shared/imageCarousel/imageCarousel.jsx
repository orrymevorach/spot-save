import { useState, useEffect, useRef } from 'react';
import {
  faChevronLeft,
  faChevronRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import clsx from 'clsx';
import Image from 'next/image';
import styles from './imageCarousel.module.scss';

FontAwesomeIcon;
export default function ImageCarousel({ images }) {
  const [index, setIndex] = useState(0);
  const currentImage = images[index];

  const handleClickLeft = () => {
    if (index === 0) setIndex(images.length - 1);
    else setIndex(index - 1);
  };
  const handleClickRight = () => {
    if (index + 1 === images.length) setIndex(0);
    else setIndex(index + 1);
  };

  // fadeIn animation
  const imageRef = useRef();
  useEffect(() => {
    imageRef.current.className = `${styles.image} ${styles.fadeIn}`;
    setTimeout(() => {
      imageRef.current.className = `${styles.image}`;
    }, 300);
  }, [index]);

  return (
    <div className={styles.carouselContainer}>
      <button onClick={handleClickLeft} className={styles.chevronLeft}>
        <FontAwesomeIcon icon={faChevronLeft} color="white" size="2xl" />
      </button>
      <Image
        src={currentImage.url}
        height={currentImage.height}
        width={currentImage.width}
        alt=""
        className={styles.image}
        ref={imageRef}
      />
      <button onClick={handleClickRight} className={styles.chevronRight}>
        <FontAwesomeIcon icon={faChevronRight} color="white" size="2xl" />
      </button>
      <div className={styles.dotContainer}>
        {images.map((_, dotIndex) => {
          const isActive = dotIndex === index;
          return (
            <div
              className={clsx(styles.dot, isActive && styles.active)}
              key={`dot-${dotIndex}`}
            ></div>
          );
        })}
      </div>
    </div>
  );
}
