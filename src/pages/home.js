import React, { useState } from 'react';
import styles from "../styles/home.module.css";
import Navbar from "../components/navbar.js";


function Home() {
    
    return (
        <div className={styles.banner}>
            <Navbar />
            
            <div className={styles.content}>
                
                    <h1 className="">Welcome to our Electronic Equipment Management System</h1>
                    <p>Streamline your equipment requests and management</p>
                    {!localStorage.getItem('jwt') && <div>
                    <a href="/login"><button ><span></span>Login</button></a>
                    <a href="register"><button ><span></span>Sign up</button></a>
                    </div>}
            </div>

        </div>


     )}
export default Home;