"use client";

import Link from 'next/link';
import styles from './Navbar.module.css';
import { images } from "../../Images/images";
import NavProfile from '../Profile/Profile';
import Burger from '../Burger/Burger';
import AdminMenu from '../ToAdminLi/AdminMenu';
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState,useCallback } from 'react';

interface DecodedToken {
  role: string;
}
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  
  const toggleMenu = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const checkIfAdmin = () => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const decodedToken = jwtDecode<DecodedToken>(token); 
          if (decodedToken?.role === "admin") {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('decodeError:', error);
          setIsAdmin(false);
        }
      } else {
        setIsAdmin(false);
      }
    }
  };

  useEffect(() => {
    checkIfAdmin(); 
  }, []);
  console.log(isAdmin);
  
  return (
    <>
      <nav className={styles.navbar}>
      <Link href="/">
         <img src={images.logo.src} className={styles.logo} alt="Logo" />
      </Link>
        <div className={`${styles.menu}`}>
      {isAdmin ? <AdminMenu isAdmin={isAdmin}/> : false}

          <NavProfile/>
        </div>
        <Burger isOpen={isOpen} toggleMenu={toggleMenu} />

      </nav>
    </>
  );
};

export default Navbar;
