import React from 'react';
import styles from './Navbar.module.css';
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <div className={styles.brand}>
                <p>Aabiskar Dhenga</p>
            </div>
            <div className={styles.links}>
                <Link to="/" className={styles.link}>
                    <p>Home</p>
                </Link>
                <Link to="/login" className={styles.link}>
                    <p>Login</p>
                </Link>
                <Link to="/dashboard" className={styles.link}>
                    <p>Dashboard</p>
                </Link>
                <div className={styles.profile}>
                    <img src="https://images.pexels.com/photos/4709289/pexels-photo-4709289.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Profile" />
                </div>
            </div>
        </div>
    );
};

export default Navbar;
