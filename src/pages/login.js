import React, { useState } from 'react';
import Navbar from "../components/navbar.js";
import styles from "../styles/login.module.css";
import axios from 'axios';

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
        try{
            axios.post('http://localhost:8090/authentication/login', credentials)
            .then((response)=>{
                if(response.status === 200){
                    localStorage.setItem('jwt', response.data.token);
                    window.location.href='/';
                }
            }).catch((message)=>{
                setErrorMsg(true);
            });
        }
        catch(message){
            alert('email ou mot de passe incorrects');
        };
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