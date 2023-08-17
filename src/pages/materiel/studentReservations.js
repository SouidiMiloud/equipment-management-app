import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reservations.module.css"


const StudentReservations = ()=>{

    const [reservations, setReservations] = useState([]);
    const [notif, setNotif] = useState({});

    useEffect(()=>{
        fetch(`http://localhost:8090/getUserReservations`, {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'GET'
        })
        .then((response)=>{
            if(response.status === 200)
                return response.json();
        })
        .then(data=>setReservations(data));

        fetch('http://localhost:8090/getNotification', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }, 
            method: 'GET'
        })
        .then((response)=>{
            if(response.status === 200)
                return response.json();
        })
        .then(data=>setNotif(data));
    }, []);

    const ok_clicked = ()=>{
        fetch('http://localhost:8090/removeNotif', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: JSON.stringify({notifId: notif.id})
        })
        setNotif({});
    }

    return(
        <>
            <Navbar/>
            <table className={styles.table}>
            <thead>
                <tr>
                    <th>date</th>
                    <th>materiel</th>
                    <th>début</th>
                    <th>fin</th>
                    <th>état</th>
                </tr>
            </thead>
            <tbody>
            {reservations && reservations.map(reservation=>(
                <tr>
                    <td>{reservation.time}</td>
                    <td>{reservation.equipmentName}</td>
                    <td>{reservation.startsAt}</td>
                    
                    <td>{reservation.endsAt}</td>
                    {reservation.reservationState === 'UNCHECKED' && <td className={styles.enAttente}>EN ATTENTE</td>}
                    
                    {reservation.reservationState === 'CONFIRMED' &&<td className={styles.confirmed}>CONFIRMÉ</td>}
                    
                    {reservation.reservationState === 'REJECTED' && <td className={styles.rejected}>ANNULÉ</td>}
                </tr>
            ))}
            </tbody>
        </table>

        {notif && notif.content && <div className={styles.user_msg}>
            <h3>{notif.content}</h3>
            <button onClick={()=>ok_clicked()}>OK</button>
        </div>}

        </>
    );
}
export default StudentReservations;