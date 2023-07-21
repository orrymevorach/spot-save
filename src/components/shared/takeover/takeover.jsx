import React, { useEffect, useRef, useState } from 'react';
import style from './takeover.module.scss';
import CloseButton from '@/components/shared/closeButton';
import clsx from 'clsx';

export default function Takeover({
  children,
  styles,
  disableOverlayClose,
  handleClose,
  showTakeover,
  classNames = '',
  modalClassNames = '',
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = () => {
    const body = document.getElementsByTagName('body')[0];
    body.style.overflow = 'unset';
    handleClose ? handleClose() : setIsModalOpen(false);
  };

  // Stop scroll of page only if modal content is shorter than the rest of the page
  const takeoverRef = useRef();
  useEffect(() => {
    const windowHeight = window.innerHeight;
    const modalHeight = takeoverRef.current.clientHeight;
    if (windowHeight >= modalHeight) {
      const body = document.getElementsByTagName('body')[0];
      body.style.overflow = 'hidden';
    }
    () => (body.style.overflow = 'visible');
  }, []);

  const isOpen = showTakeover ? showTakeover : isModalOpen;
  return (
    <>
      {isOpen && (
        <div
          className={clsx(style.takeover, classNames)}
          style={styles}
          ref={takeoverRef}
        >
          <div
            className={style.overlay}
            onClick={disableOverlayClose ? () => {} : closeModal}
          ></div>
          <div className={clsx(style.modal, modalClassNames)}>
            {children}
            <CloseButton handleClick={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
