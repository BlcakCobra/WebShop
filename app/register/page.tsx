"use client";

import React from 'react';
import styles from "./Register.module.css";
import { useAppDispatch, useAppSelector } from '../store/store';
import { AsynkAuthentication, controlConfirmPassword, controlPassword, controlUsername } from '../store/Slices/AuthenticationSlice';
import {images} from "./../Images/images"
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function Register() {
  const { username, password, confirmPassword } = useAppSelector((state) => state.Authentication);
  const dispatch = useAppDispatch();
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(AsynkAuthentication({ username, password, confirmPassword }));
  };

  const router = useRouter()  
  const  previousPage = () => {
    router.back()
  }
  return (
    <>
    <div className={styles.MainRegisterPage}  style={{backgroundImage:`url(${images.AuthBackground.src})`}} >
      <button onClick={() =>previousPage()} className={styles.prevButton}>Back</button>
    <div className={styles.regMenu}>
    <h1 className={styles.h1}>Registration</h1>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="username" 
          value={username} 
          placeholder="Username" 
          onChange={(e) => dispatch(controlUsername(e.target.value))} 
          className={styles.inputForm}
          autoComplete="username"
        />
        <input 
          type="password" 
          name="password" 
          value={password} 
          placeholder="Password" 
          autoComplete="current-password"
          onChange={(e) => dispatch(controlPassword(e.target.value))} 
          className={styles.inputForm}
        />
        <input 
          type="password" 
          name="confirmPassword" 
          value={confirmPassword} 
          placeholder="Confirm Password"
          autoComplete="current-password"
          className={styles.inputForm}
          onChange={(e) => dispatch(controlConfirmPassword(e.target.value))} 
        />
          <Link href="/login" className={styles.haveAcc}><h3 >if you already have an account</h3></Link>
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
    </div>
    </>
  );
}