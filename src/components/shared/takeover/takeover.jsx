import React, { useState } from 'react';
import style from './takeover.module.scss';
import { CloseButton } from '../icons/icons';

export default function Takeover({ children, styles }) {
  const [isOpen, setIsOpen] = useState(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      {isOpen && (
        <div className={style.takeover} style={styles}>
          <div className={style.overlay} onClick={handleClose}></div>
          <div className={style.modal}>
            {children}
            <CloseButton handleClick={handleClose} />
          </div>
        </div>
      )}
    </>
  );
}
