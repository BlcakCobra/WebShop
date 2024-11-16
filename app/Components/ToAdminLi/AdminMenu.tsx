"use client";

import React, { useState } from "react";
import { AdminMenuType } from "../../types/ComponentsType";
import styles from './AdminMenu.module.css';


const AdminMenu:React.FC<AdminMenuType> = ({isAdmin}) =>{ 
    const [isOpen,setIsOpen] = useState(false)
    const HoverMenu = () =>{
      setIsOpen(true)
      console.log(isOpen);
      
    }
    
  return (
    <div className={styles.AdminLi} onMouseEnter={() =>HoverMenu}>
      AdminPanel
    </div> 
  );
}
export default AdminMenu