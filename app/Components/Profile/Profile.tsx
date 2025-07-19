"use client"
import React, { useEffect, useRef, useState } from 'react'
import Link from 'next/link';
import { useAppSelector } from '../../store/store'; 
import { useRouter } from 'next/navigation';
import { imagesSite } from '../../Images/images';

import styles from "./Profile.module.css"
import { NavProfileType } from '../../types/ComponentsType';
import { useClickOutside } from '../../OwnHooks/useClickOutside';

const NavProfile:React.FC<NavProfileType> = ({openSettingsMenuProfile,settingsMenuProfile}) =>{ 

    const [isClient, setIsClient] = useState(false);
    const [showProfile, setShowProfile] = useState(false);
    const wrapperRef = useRef<HTMLDivElement>(null);

    const default_avatar = imagesSite.default_avatar

    useEffect(() => {
      setIsClient(true);
    }, []);

    const { token } = useAppSelector(state => state.login);

    const router = useRouter();


  
    useClickOutside(wrapperRef, () => setShowProfile(false));

    
    const logout = () => {
        if(token){
          if (typeof window !== 'undefined' && isClient) {
            localStorage.removeItem("token");
            setTimeout(() => router.refresh(), 100); 
          }
        }
      };

     
      {if (!isClient) return null; }
       

    
  return (
    <div onClick={() =>setShowProfile(prev =>!prev)} ref={wrapperRef}>
              <img src={default_avatar.src} className={styles.avatar}/>
              {showProfile && token &&(
                <div className={styles.settingsMenu}>
                  <ul>
                    <li className={styles.setMenuUl}>
                      <Link href="/profile" className={styles.setMenuUl}>Profile</Link>
                    </li>
                    <li className={styles.setMenuUl}>
                      <Link href="/settings" className={styles.setMenuUl}>Settings</Link>
                    </li>
                    <li>
                      <button onClick={logout}>{token ? "Logout" :null}</button>
                    </li>
                  </ul>
                </div>
              )}
              {showProfile && !token &&(
                <div className={styles.settingsMenu}>
                  <ul>
                  <li><Link href="/login" className={styles.a} >Login</Link></li>
                  <li><Link href="/register" className={styles.a} >Registration</Link></li>
                  </ul>
                </div>
              )}
            </div>
  )
}

export default NavProfile