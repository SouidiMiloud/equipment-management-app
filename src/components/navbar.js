import React, { useEffect, useState } from "react";
import styles from './navbar.module.css';
import img from "../Assets/images/Logo_inpt.png";

import SockJS from "sockjs-client";
import Stomp  from 'stompjs';


function Navbar({navbarChanged, setNavbarChanged}){
    const [nameAndRole, setNameAndRole] = useState({});
    const [reservationsNum, setReservationsNum] = useState(null);

    useEffect(()=>{

        if(localStorage.getItem('jwt')){
            fetch('http://localhost:8090/getNameAndRole', {
                headers:{
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
                method: 'GET'
            })
            .then(response=>{
                if(response.status === 200)
                    return response.json();
            })
            .then(data=>{
                setNameAndRole(data);
            });

            fetch('http://localhost:8090/getReservationsNum', {
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
                setReservationsNum(data);
            });

            const socket = new SockJS('http://localhost:8090/wsocket');
            const stompClient = Stomp.over(socket);
            if(nameAndRole.role === 'ADMIN'){
                stompClient.connect({}, ()=>{
                    stompClient.subscribe('/topic/reservations', (data)=>{ 
                        const num = JSON.parse(data.body).body;
                        setReservationsNum(num);
                        try{
                            setNavbarChanged(!navbarChanged);
                        }
                        catch(error){
                            console.log('not present');
                        }
                    });
                });
            }
            else if(nameAndRole.role ==='STUDENT'){
                stompClient.connect({}, ()=>{
                    stompClient.subscribe(`/user/${nameAndRole.username}/private`, (data)=>{ 
                        const num = JSON.parse(data.body).body;
                        setReservationsNum(num);
                    });
                });
            }
            return ()=>{
                if(stompClient.connected)
                    stompClient.disconnect();
            }
        };
    }, [reservationsNum]);

    return (
        <>
        {(reservationsNum || !localStorage.getItem('jwt')) && <div className={styles.banner}>
            <div className={styles.navbar}>
                <img src={img} className={styles.logo} alt="" />
                <ul className={styles.elm}>
                    <li><a className="" href="/">Home</a></li>
                    <li><a href="/materiel">Materiel</a></li>
                    <li><a href="/about">About</a></li>
                    {nameAndRole.role !== 'ADMIN' && <li><a href="/contact">Contact</a></li>}
                    {nameAndRole.role === 'STUDENT' && <li><a href="/demandes">{`Mes demandes(${reservationsNum})`}</a></li>}
                    {nameAndRole.role === 'ADMIN' && <li><a href="/reservations">{`Demandes(${reservationsNum})`}</a></li>}
                    {nameAndRole.role === 'ADMIN' && <li><a href="/students">Etudiants</a></li>}
                    {nameAndRole.role === 'ADMIN' && <li><a href="/materiel/new">Nouveau materiel</a></li>}
                    {localStorage.getItem('jwt') && <li><a href="/logout">logout</a></li>}
                </ul>
            </div>
            
        </div>}
        </>
    )
}

export default Navbar;