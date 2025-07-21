"use client";
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './Navbar.module.css';
import { imagesSite } from "../../Images/images";
import UserProfile from '../Profile/Profile';
import BurgerMenu from '../Burger/Burger';
import { AdminMenu } from '../ToAdminLi/AdminMenu';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { checkIfAdmin } from '../../store/Slices/LoginSlice';
import CategoryList from './ClothingList/ClothingList';
import SearchBar from '../SearchBar/SearchBar';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false);
  const [isUserProfileMenuOpen, setIsUserProfileMenuOpen] = useState(false);

  const isAdmin = useAppSelector(state => state.login.isAdmin);
  const dispatch = useAppDispatch();

  const toggleAdminMenu = () => {
    setIsAdminMenuOpen(prev => !prev);
    setIsUserProfileMenuOpen(false);
  };

  const toggleUserProfileMenu = () => {
    setIsUserProfileMenuOpen(prev => !prev);
    setIsAdminMenuOpen(false);
  };

  const toggleMobileMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev);
  }, []);

  useEffect(() => {
    dispatch(checkIfAdmin());
  }, [dispatch]);

  return (
    <header className={styles.navbar}>
      <div className={styles.ContentBox}>
        <Link href="/">
          <img src={imagesSite.logo.src} className={styles.logo} alt="Logo" />
        </Link>

        <nav className={styles.nav}>
          <ul className={styles.navItemBox}>
            <li className={styles.navItems}>
              <CategoryList />
            </li>
          </ul>
        </nav>

        <div className={`${styles.menu} ${isMenuOpen ? styles.active : ''}`}>
          {isAdmin && (
            <AdminMenu
              isAdmin={isAdmin}
              openSettingsMenuAdmin={toggleAdminMenu}
              settingsMenuAdmin={isAdminMenuOpen}
            />
          )}
          <SearchBar />
          <UserProfile
            openSettingsMenuProfile={toggleUserProfileMenu}
            settingsMenuProfile={isUserProfileMenuOpen}
          />
        </div>

        <BurgerMenu isOpen={isMenuOpen} toggleMenu={toggleMobileMenu} />
      </div>
    </header>
  );
};

export default Navbar;
