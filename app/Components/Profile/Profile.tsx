import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import { useAppSelector } from '../../store/store'; 
import { useRouter } from 'next/navigation';
import { images } from '../../Images/images';

import styles from "./Profile.module.css"

export default function NavProfile() {
    const [settingsMenu, setSettingsMenu] = useState(false);
    const [isClient, setIsClient] = useState(false);
    const default_avatar = images.default_avatar

    useEffect(() => {
      setIsClient(true);
    }, []);

    const { token } = useAppSelector(state => state.login);

    const router = useRouter();

    const logout = () => {
        if(token){
          if (typeof window !== 'undefined' && isClient) {
            localStorage.removeItem("token");
            router.refresh();
          }
        }
      };

      const openSettingsMenu = () => {
        setSettingsMenu(!settingsMenu);
      };

      if (!isClient) return null; 
       
  return (
    <li >
              <img src={default_avatar.src} className={styles.avatar}onMouseEnter={openSettingsMenu}/>
              {settingsMenu && token &&(
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
              {settingsMenu && !token &&(
                <div className={styles.settingsMenu}>
                  <ul>
                  <li><Link href="/login" className={styles.a} >Login</Link></li>
                  <li><Link href="/register" className={styles.a} >Registration</Link></li>
                  </ul>
                </div>
              )}
            </li>
  )
}