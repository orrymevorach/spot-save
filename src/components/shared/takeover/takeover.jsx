import React, { useState } from 'react';
import style from './takeover.module.scss';
import CloseButton from '../closeButton';

export default function Takeover({
  children,
  styles,
  disableOverlayClose,
  handleClose,
  showTakeover,
}) {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const closeModal = handleClose ? handleClose : () => setIsModalOpen(false);
  const isOpen = showTakeover ? showTakeover : isModalOpen;
  return (
    <>
      {isOpen && (
        <div className={style.takeover} style={styles}>
          <div
            className={style.overlay}
            onClick={disableOverlayClose ? () => {} : closeModal}
          ></div>
          <div className={style.modal}>
            {children}
            <CloseButton handleClick={closeModal} />
          </div>
        </div>
      )}
    </>
  );
}
