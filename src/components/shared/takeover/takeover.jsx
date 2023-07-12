import React, { useState } from 'react';
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
  const closeModal = handleClose ? handleClose : () => setIsModalOpen(false);
  const isOpen = showTakeover ? showTakeover : isModalOpen;
  return (
    <>
      {isOpen && (
        <div className={clsx(style.takeover, classNames)} style={styles}>
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
