import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reservations.module.css"
import fetchData from "../../config/api";


const StudentReservations = ()=>{

    const [reservations, setReservations] = useState([]);
    const [message, setMessage] = useState('');

    useEffect(()=>{
        fetchData('/reservation/getUserReservations', 'GET', '')
        .then(data=>setReservations(data));

    }, []);

    return(
        <>
            <Navbar/>
            <table className={styles.table}>
            <thead>
                <tr>
                    <th>date</th>
                    <th>produit</th>
                    <th>début</th>
                    <th>fin</th>
                    <th>quantité</th>
                    <th>état</th>
                </tr>
            </thead>
            <tbody>
            {reservations && reservations.map(reservation=>(
                <tr onMouseEnter={()=>{setMessage(reservation.message)}}
                    onMouseLeave={()=>{setMessage('')}}
                >
                    <td>{reservation.time}</td>
                    <td>{reservation.productName}</td>
                    <td>{reservation.startsAt}</td>
                    
                    <td>{reservation.endsAt}</td>
                    <td>{reservation.items}</td>
                    {reservation.reservationState === 'UNCHECKED' && <td className={styles.enAttente}>EN ATTENTE</td>}
                    
                    {reservation.reservationState === 'CONFIRMED' &&<td className={styles.confirmed}>CONFIRMÉ</td>}
                    
                    {reservation.reservationState === 'REJECTED' && <td className={styles.rejected}>ANNULÉ</td>}
                </tr>
            ))}
            </tbody>
        </table>
        {message && <div className={styles.user_msg}>
            <h3>{message}</h3>
        </div>}
        </>
    );
}
export default StudentReservations;