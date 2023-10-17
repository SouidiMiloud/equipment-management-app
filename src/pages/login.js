import React, { useState } from 'react';
import Navbar from "../components/navbar.js";
import styles from "../styles/login.module.css";
import fetchData from '../config/api.js';

function Login(){
    
    const [errorMsg, setErrorMsg] = useState(false);
    const [credentials, setCredentials] = useState({
            email: '',
            password: '',
        });

    const onChangeMethod = ((event)=>{
        const {name, value} = event.target;
        setCredentials((prevCred)=>({
            ...prevCred,
            [name]: value
        }));  
        setErrorMsg(false);      
    });
    const submitForm = (e)=>{
        
        e.preventDefault();
        fetchData('/authentication/login', 'POST', credentials)
        .then(data=>{
            localStorage.setItem('jwt', data.token);
            window.location.href='/';
        })
        .catch(error=>setErrorMsg(true));
    }

    return(
        <div className={styles.banner}>
            <Navbar />
            <div className={styles.container}>
                <form onSubmit={submitForm}>
                    <h1> Connectez-vous </h1>
                    <div className={styles.inputbox}>
                        <input type="text" name='email' value={credentials.email} onChange={onChangeMethod} id="email" placeholder="Entrez votre email" />
                    </div>
                    <div className={styles.inputbox}>
                        <input type="password" name='password' value={credentials.password} onChange={onChangeMethod} id="mobile" placeholder="Entrez votre mot de passe" />
                        {errorMsg && <p className={styles.error_msg}>email ou mot de passe incorrects</p>}
                    </div>

                    <div className={styles.rememberforgot}>
                        <label><input className = {styles.remember}type="checkbox" id="remember"/>Remember me</label>
                        <a href="#" className={styles.forgot}>Forgot password?</a>
                    </div>
                    <button type="submit" className={styles.btn}>Login</button>
                    <div className={styles.registerlink}>
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>

        </div>
    );
}

export default Login;