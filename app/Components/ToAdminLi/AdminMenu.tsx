"use client";

import React from "react";
import { AdminMenuType } from "../../types/ComponentsType";
import styles from './AdminMenu.module.css';
import Link from "next/link";


export const AdminMenu: React.FC<AdminMenuType> = ({ isAdmin, openSettingsMenuAdmin, settingsMenuAdmin }) => {
  return (
    <div className={styles.adminMenuContainer}>
      <div className={styles.adminButton} onClick={openSettingsMenuAdmin}>
        AdminMenu
      </div>

      {settingsMenuAdmin && (
        <div className={styles.settingsMenu}>
          <ul>
            <li className={styles.setMenuUl}>
              <Link href="/crProduct" className={styles.setMenuUl}>Create Product</Link>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
