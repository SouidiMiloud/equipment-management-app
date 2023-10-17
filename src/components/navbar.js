import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import img from "../Assets/images/Logo_inpt.png";

import fetchData from "../config/api"
import { connectWebSocket } from "../config/websocket";


function Navbar({navbarChanged, setNavbarChanged}){
    const [nameAndRole, setNameAndRole] = useState({});
    const [reservationsNum, setReservationsNum] = useState(null);

    useEffect(()=>{

        if(localStorage.getItem('jwt')){
            fetchData('/user/getNameAndRole', 'GET', '')
            .then(data=>{
                setNameAndRole(data);
            });

            fetchData('/reservation/getReservationsNum', 'GET', '')
            .then(data=>{
                setReservationsNum(data);
            });

            connectWebSocket(nameAndRole.username, nameAndRole.role, setReservationsNum, setNavbarChanged);
        }
    }, [reservationsNum]);

    return (
        <>
        {(reservationsNum || !localStorage.getItem('jwt')) && <div className={styles.banner}>
            <div className={styles.navbar}>
                <img src={img} className={styles.logo} alt="" />
                <ul className={styles.elm}>
                    <li><a className="" href="/">Home</a></li>
                    <li><a href="/product">Produits</a></li>
                    <li><a href="/about">About</a></li>
                    {nameAndRole.role !== 'ADMIN' && <li><a href="/contact">Contact</a></li>}
                    {nameAndRole.role === 'STUDENT' && <li><a href="/demandes">{`Mes demandes(${reservationsNum})`}</a></li>}
                    {nameAndRole.role === 'ADMIN' && <li><a href="/reservations">{`Demandes(${reservationsNum})`}</a></li>}
                    {nameAndRole.role === 'ADMIN' && <li><a href="/students">Etudiants</a></li>}
                    {nameAndRole.role === 'ADMIN' && <li><a href="/product/new">Nouveau produit</a></li>}
                    {localStorage.getItem('jwt') && <li><a href="/logout">logout</a></li>}
                </ul>
            </div>
            
        </div>}
        </>
    )
}

export default Navbar;