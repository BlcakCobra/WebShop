"use client";
import React, { useEffect } from 'react';
import styles from "./Login.module.css"
import { useAppDispatch, useAppSelector} from "./../store/store"
import { useRouter } from 'next/navigation';
import { AsyncLoginSlice, controlPassword, controlUsername } from "./../store/Slices/LoginSlice"

export default function Login() {
  const { username, password,error,token} = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch();
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(AsyncLoginSlice({username,password}))
  };
  const router = useRouter()  

  console.log(token);
  useEffect(() =>{
    if(token !== null){
      router.push("/")
    }
  },[token, router])
 

    
  return (
    <>
    <div className={styles.MainRegisterPage} >
    <div className={styles.regMenu}>
    <h1 className={styles.h1}>Login</h1>
      <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="username"
        autoComplete="username"
        value={username}
        placeholder="Username"
        onChange={(e) => dispatch(controlUsername(e.target.value))}
        className={styles.inputForm}
      />

      <input
        type="password"
        name="password"
        autoComplete="current-password"
        value={password}
        placeholder="Password"
        onChange={(e) => dispatch(controlPassword(e.target.value))}
        className={styles.inputForm}
      />
         {error && <div className={styles.errorMessage}>{error}</div>}
        <button type="submit" className={styles.submitButton}>Submit</button>
      </form>
    </div>
    </div>
    </>
  );
}