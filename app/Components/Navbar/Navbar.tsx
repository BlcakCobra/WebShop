"use client";
import Link from 'next/link';
import React, { useEffect, useState, useCallback } from 'react';
import styles from './Navbar.module.css';
import { images } from "../../Images/images";
import NavProfile from '../Profile/Profile';
import Burger from '../Burger/Burger';
import AdminMenu from '../ToAdminLi/AdminMenu';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { checkIfAdmin } from '../../store/Slices/LoginSlice';
import ClothingList from './ClothingList/ClothingList';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [settingsMenuAdmin, setSettingsMenuAdmin] = useState(false);
  const [settingsMenuProfile, setSettingsMenuProfile] = useState(false);

  const isAdmin = useAppSelector(state => state.login.isAdmin);
  const dispatch = useAppDispatch();

  const openSettingsMenuAdmin = () => {
    setSettingsMenuAdmin(prev => !prev);
    setSettingsMenuProfile(false);
  };

  const openSettingsMenuProfile = () => {
    setSettingsMenuProfile(prev => !prev);
    setSettingsMenuAdmin(false);
  };

  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  useEffect(() => {
    dispatch(checkIfAdmin());
  }, []);

  return (
    <nav className={styles.navbar}>
      <Link href="/">
        <img src={images.logo.src} className={styles.logo} alt="Logo" />
      </Link>
      <div className={styles.ElementNavbarBox}>
        <ClothingList/>
      </div>
      <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        {isAdmin && (
          <AdminMenu
            isAdmin={isAdmin}
            openSettingsMenuAdmin={openSettingsMenuAdmin}
            settingsMenuAdmin={settingsMenuAdmin}
          />
        )}
        <NavProfile
          openSettingsMenuProfile={openSettingsMenuProfile}
          settingsMenuProfile={settingsMenuProfile}
        />
      </div>
      <Burger isOpen={isOpen} toggleMenu={toggleMenu} />
    </nav>
  );
};

export default Navbar;
