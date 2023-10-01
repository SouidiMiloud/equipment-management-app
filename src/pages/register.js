import React, { useState } from 'react';
import Navbar from "../components/navbar.js";
import styles from "../styles/register.module.css";
import axios from 'axios';

function Register() {

    const [info, setInfo] = useState({
        first_name: '',
        last_name: '',
        level: 'INE1',
        field: 'SESNUM',
        email: '',
        phone: '',
        password: '',
        confirm_password: ''
        
    });
    const [errors, setErrors] = useState({});
    const [levelOpen, setLevelOpen] = useState(false);
    const [fieldOpen, setFieldOpen] = useState(false);

    const changeInfo = (event)=>{
        const {name, value} = event.target;
        setInfo((prevInfo)=>({
            ...prevInfo,
            [name]: value
        }))
        setErrors({});
    };
    const changeLevel = (levelValue)=>{
        setInfo((prev)=>({
            ...prev,
            level: levelValue
        }))
        setLevelOpen(false);
    }
    const changeField = (fieldValue)=>{
        setInfo((prev)=>({
            ...prev,
            field: fieldValue
        }))
        setFieldOpen(false);
    }

    const addUser = async(e)=>{
        e.preventDefault();
        try{
            await axios.post('http://localhost:8090/register', info)
            .then((response)=>{
                window.location.href='/login';
            })
            .catch((error)=>{
                setErrors(error.response.data);
            })
        }
        catch(error){
            alert('une erreur est survenue');
        }
    }

    return (
        <div className={styles.banner}>
            <Navbar />
            <div className={styles.container}>
                
                <form onSubmit={addUser}>
                    <h2> Registration </h2>
                    <div className={styles.frm}> 
                     
                        <div className={styles.inputbox}>
                            <span className={styles.details}> Prenom </span>
                            <input type="text" name='first_name' value={info.first_name} onChange={changeInfo} id="firstName" placeholder="Entrez votre prenom" />
                            {'first_name' in errors && <p className={styles.error_msg}>{errors.first_name}</p>}
                        </div>
                        <div className={styles.inputbox}>
                            <span className={styles.details}> Nom </span>

                            <input type="text" name='last_name' value={info.last_name} onChange={changeInfo} id="lastName" placeholder="Entrez votre nom" />
                            {'last_name' in errors && <p className={styles.error_msg}>{errors.last_name}</p>}
                        </div>

                        <div className={styles.inputbox}>
                            <span className={styles.details}> niveau </span>

                            <div className={styles.dropdown}>
                                <button type="button" className={styles.dropbtn} onClick={()=>{setLevelOpen(!levelOpen)}}>{info.level}</button>
                                {levelOpen && <div className={styles.levelOption}>
                                    <button type="button" onClick={()=>changeLevel('INE1')}>INE1</button>
                                    <button type="button" onClick={()=>changeLevel('INE2')}>INE2</button>
                                    <button type="button" onClick={()=>changeLevel('INE3')}>INE3</button>
                                </div>}
                            </div>

                        </div>

                        <div className={styles.inputbox}>
                            <span className={styles.details}> filière </span>

                            <div className={styles.dropdown}>
                                <button type="button" className={styles.dropbtn} onClick={()=>{setFieldOpen(!fieldOpen)}}>{info.field}</button>
                                {fieldOpen && <div className={styles.levelOption}>
                                    <button type="button" onClick={()=>changeField('SESNUM')}>SESNUM</button>
                                    <button type="button" onClick={()=>changeField('ASEDS')}>ASEDS</button>
                                    <button type="button" onClick={()=>changeField('DATA')}>DATA</button>
                                    <button type="button" onClick={()=>changeField('CLOUD')}>CLOUD</button>
                                    <button type="button" onClick={()=>changeField('SMART')}>SMART</button>
                                    <button type="button" onClick={()=>changeField('AMOA')}>AMOA</button>
                                    <button type="button" onClick={()=>changeField('ICCN')}>ICCN</button>
                                </div>}
                            </div>

                        </div>

                        <div className={styles.inputbox}>
                            <span className={styles.details}> Email </span>

                            <input type="text" name='email' value={info.email} onChange={changeInfo} id="email" placeholder="Entrez votre email" />
                            {'email' in errors && <p className={styles.error_msg}>{errors.email}</p>}
                        </div>
                    
                        <div className={styles.inputbox}>
                            <span className={styles.details}> Mobile phone </span>

                            <input type="text" name='phone' value={info.phone} onChange={changeInfo} id="mobile" placeholder="Entrez votre numero" />
                            {'phone' in errors && <p className={styles.error_msg}>{errors.phone}</p>}
                        </div>
                        <div className={styles.inputbox}>
                            <span className={styles.details}> Mot de passe </span>

                            <input type="password" name='password' value={info.password} onChange={changeInfo} id="password" placeholder="Entrez votre mot de passe" />
                            {'password' in errors && <p className={styles.error_msg}>{errors.password}</p>}
                        </div>
                        <div className={styles.inputbox}>
                            <span className={styles.details}> Confirmer le mot de passe </span>

                            <input type="password" name='confirm_password' value={info.confirm_password} onChange={changeInfo} id="confirmpassword" placeholder="Confirmer le mot de passe" />
                            {'confirm_password' in errors && <p className={styles.error_msg}>{errors.confirm_password}</p>}
                        </div>
                    </div>
                    
                    <button type="submit" className={styles.btn} value="Register">Register</button>
                    
                </form>
            </div>

        </div>
    );
}

export default Register;