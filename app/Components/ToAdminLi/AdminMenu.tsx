"use client";

import React, { useRef, useState } from "react";
import { AdminMenuType } from "../../types/ComponentsType";
import styles from './AdminMenu.module.css';
import Link from "next/link";
import { useClickOutside } from "../../OwnHooks/useClickOutside";


export const AdminMenu: React.FC<AdminMenuType> = ({ isAdmin, openSettingsMenuAdmin, settingsMenuAdmin }) => {
  const [showAdminMenu, setShowAdminMenu] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useClickOutside(wrapperRef, () => setShowAdminMenu(false));


  return (
    <div className={styles.adminMenuContainer} ref={wrapperRef}>
      <div className={styles.adminButton} onClick={() =>setShowAdminMenu(prev => !prev)}>
        AdminMenu
      </div>

      {showAdminMenu && (
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
