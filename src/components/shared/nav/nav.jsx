import React, { useState, useEffect } from 'react';
import styles from './nav.module.scss';
import Link from 'next/link';
import HamburgerMenu from './hamburger-menu/hamburger-menu';
import clsx from 'clsx';
import Button from '@/components/shared/button/button';
import { useWindowSize } from '@/context/window-size-context';
import Image from 'next/image';
import logo from 'public/reserved.png';
import { ROUTES } from '@/utils/constants';

export default function Nav({ hamburgerMenuColor = '', navData = [] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [pathname, setPathname] = useState('');
  const { isMobile, isDesktop, isTablet } = useWindowSize();
  const showNav = isDesktop || isTablet || (isMobile && isOpen);

  useEffect(() => {
    const body = document.getElementsByTagName('body')[0];
    if (isOpen) {
      body.style.overflow = 'hidden';
    } else {
      body.style.overflow = 'visible';
    }
  }, [isOpen]);

  useEffect(() => {
    if (window?.location) {
      setPathname(window.location.pathname);
    }
  }, [pathname]);

  return (
    <>
      {showNav ? (
        <nav className={styles.nav}>
          <ul className={styles.navList}>
            <li>
              <Link href={ROUTES.HOME}>
                <Image src={logo} alt="Logo" quality={60} />
              </Link>
            </li>
            <div>
              {navData.map(
                ({
                  url,
                  label,
                  isButton,
                  isShowing = true,
                  handleClick = () => {},
                  isAnchor,
                }) => {
                  if (!isShowing) return;
                  if (isButton) {
                    return (
                      <li key={label} className={styles.link}>
                        <Button
                          handleClick={handleClick}
                          classNames={styles.button}
                          href={url}
                          isAnchor={isAnchor}
                        >
                          {label}
                        </Button>
                      </li>
                    );
                  }
                  return (
                    <li
                      key={url}
                      className={clsx(
                        url === pathname && styles.active,
                        styles.link
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      <Link href={url}>{label}</Link>
                    </li>
                  );
                }
              )}
            </div>
          </ul>
        </nav>
      ) : null}
      <HamburgerMenu
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        hamburgerMenuColor={hamburgerMenuColor}
      />
    </>
  );
}
