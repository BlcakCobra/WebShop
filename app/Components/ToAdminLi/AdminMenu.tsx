"use client";

import React from "react";
import { AdminMenuType } from "../../types/ComponentsType";
import styles from './AdminMenu.module.css';
import Link from "next/link";


const AdminMenu:React.FC<AdminMenuType> = ({isAdmin,openSettingsMenuAdmin,settingsMenuAdmin}) =>{ 
   
    
    return (
      <>
        <div className={styles.adminButton} onClick={openSettingsMenuAdmin}>
        AdminMenu
        {settingsMenuAdmin ? <div className={styles.settingsMenu}>
                  <ul>
                    <li className={styles.setMenuUl}>
                      <Link href="/crProduct" className={styles.setMenuUl}>Create Product</Link>
                    </li>
                  </ul>
                </div> 
            : false}
      </div>
      </>
    );
}
export default AdminMenu