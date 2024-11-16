import React, { useState } from 'react'
import styles from "./../Burger/Burger.module.css"
import {BurgerType} from "./../../types/ComponentsType"

const Burger: React.FC<BurgerType> = ({isOpen,toggleMenu}) => {
  return (
   <>
    <div className={`${styles.burger} ${isOpen ? styles.open : ''}`} onClick={toggleMenu}>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
        <div className={styles.line}></div>
    </div>
   {isOpen && <div className={styles.overlay} onClick={toggleMenu}></div>}
   </>
  )
}

export default Burger