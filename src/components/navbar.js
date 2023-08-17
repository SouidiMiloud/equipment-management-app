import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import img from "../Assets/images/Logo_inpt.png";


function Navbar(){
    const [role, setRole] = useState('');
    const [reservationsNum, setReservationsNum] = useState(0);

    useEffect(()=>{
        if(localStorage.getItem('jwt')){
            fetch('http://localhost:8090/getRole', {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
                method: 'GET'
            })
            .then(response=>{
                if(response.status === 200)
                    return response.text();
            })
            .then(data=>{
                setRole(data);
            });

            fetch('http://localhost:8090/getReservationsNum', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'GET'
            })
            .then((response)=>{
                if(response.status === 200)
                    return response.text();
            })
            .then((result)=>{
                setReservationsNum(result)
                console.log(result);
            });
        }
    }, [])

    // const numOfReservations = ()=>{
    //     fetch('http://localhost:8090/getReservationsNum', {
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //         method: 'GET'
    //     })
    //     .then((response)=>{
    //         if(response.status === 200)
    //             return response.text();
    //     })
    //     .then((result)=>setReservationsNum(result));
    // }

    return (
        <div className={styles.banner}>
            <div className={styles.navbar}>
                <img src={img} className={styles.logo} alt="" />
                <ul className={styles.elm}>
                    <li><a className="" href="/">Home</a></li>
                    <li><a href="/materiel">Materiel</a></li>
                    <li><a href="/about">About</a></li>
                    {role !== 'ADMIN' && <li><a href="/contact">Contact</a></li>}
                    {role !== 'ADMIN' && <li><a href="/demandes">{`Mes demandes${reservationsNum ? `(${reservationsNum})` : ''}`}</a></li>}
                    {role === 'ADMIN' && <li><a href="/reservations">{`Demandes${reservationsNum !== '0' ? `(${reservationsNum})` : ''}`}</a></li>}
                    {role === 'ADMIN' && <li><a href="/students">Etudiants</a></li>}
                    {role === 'ADMIN' && <li><a href="/materiel/new">Nouveau materiel</a></li>}

                </ul>
            </div>
            
        </div>
    )
}

export default Navbar;
