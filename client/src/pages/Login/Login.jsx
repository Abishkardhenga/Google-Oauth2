import React from 'react';
import styles from './Login.module.css';
import { FcGoogle } from "react-icons/fc";

const Login = () => {

  const loginWithGoogle = ()=>{
    window.open("http://localhost:8000/auth/google/callback", "_self")
  }
  return (
    <div className={styles.loginContainer}>
        <h1>Login</h1>
      <div className={styles.loginBox}>
        <div>
          <div className={styles.inputGroup}>
            <p>Email</p>
            <input placeholder="Enter the email" type="text" />
          </div>
          <div className={styles.inputGroup}>
            <p>Password</p>
            <input placeholder="Enter the password" type="password" />
          </div>
          <button className={styles.loginButton}>Login</button>
          <div className={styles.registerLink}>
            <p className={styles.notRegistered}>Not Registered?</p>
            <p className={styles.createAccount}>Create an Account</p>
          </div>
          <button className={styles.googleButton} onClick={loginWithGoogle}>
            <FcGoogle />
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
