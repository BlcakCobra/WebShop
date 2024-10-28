"use client";
import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { images } from "../../Images/images";
import { useAppSelector } from '../../store/store';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [settingsMenu, setSettingsMenu] = useState(false);

  const router = useRouter();

  useEffect(() => {
    setIsClient(true);
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  
  const { token } = useAppSelector(state => state.login);

  const logout = () => {
    if (typeof window !== 'undefined' && isClient) {
      localStorage.removeItem("token");
      router.refresh();
    }
  };

  const renderLinks = useMemo(() => (
    token ? null : (
      <>
        <li><Link href="/login" className={styles.a}>Login</Link></li>
        <li><Link href="/register" className={styles.a}>Registration</Link></li>
      </>
    )
  ), [token]);

  const openSettingsMenu = () => {
    setSettingsMenu(!settingsMenu);
  };

  if (!isClient) return null; 

  return (
    <>
      <nav className={styles.navbar}>
        <Link href="/"><img src={images.logo.src} className={styles.logo} alt="Logo" /></Link>

        <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
          <ul>
            <li><Link href="/" className={styles.a}>Home</Link></li>
            {renderLinks}
            <li onClick={openSettingsMenu}>
              <svg
                width="40"
                height="40"
                viewBox="0 0 64 64"
                xmlns="http://www.w3.org/2000/svg"
                className={styles.avatar}
              >
                <circle cx="32" cy="32" r="30" fill="#24d7da" />
                <path
                  d="M32 36c-6.627 0-12-5.373-12-12s5.373-12 12-12 12 5.373 12 12-5.373 12-12 12zM14 52c0-6.627 5.373-12 12-12h12c6.627 0 12 5.373 12 12v2c0 1.105-.895 2-2 2H16c-1.105 0-2-.895-2-2v-2z"
                  fill="#fff"
                />
              </svg>
              {settingsMenu && (
                <div className={styles.settingsMenu}>
                  <ul>
                    <li className={styles.setMenuUl}>
                      <Link href="/profile" className={styles.setMenuUl}>Profile</Link>
                    </li>
                    <li className={styles.setMenuUl}>
                      <Link href="/settings" className={styles.setMenuUl}>Settings</Link>
                    </li>
                    <li>
                      <button onClick={logout}>Logout</button>
                    </li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        </div>

        <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
          <div className={styles.line}></div>
        </div>
      </nav>

      {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
    </>
  );
};

export default Navbar;
