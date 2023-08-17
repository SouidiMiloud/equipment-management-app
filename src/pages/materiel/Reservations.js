import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reservations.module.css"

function Reservations(){

    const [reservations, setReservations] = useState([]);
    const [reservationId, setReservationId] = useState('');
    const [message, setMessage] = useState('');

    useEffect(()=>{
        getReservations();
    }, [])

    const getReservations = ()=>{
        fetch('http://localhost:8090/getReservations', {
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
    }

    const confirmer = (id)=>{
        fetch('http://localhost:8090/confirmReservation', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: JSON.stringify({reservationId: id})
        })
        .then(()=>getReservations());
    }

    const annuler = ()=>{
        setReservationId('');
        fetch('http://localhost:8090/rejectReservation', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: JSON.stringify({reservationId: reservationId, message: message})
        })
        .then(()=>getReservations());
    }

    const deleteReservation = (reservationId)=>{
        fetch('http://localhost:8090/deleteReservation', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: JSON.stringify({reservationId, reservationId})
        })
        .then(()=>getReservations());
    }

    return(
    <div>
        <Navbar/>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>date</th>
                    <th>materiel</th>
                    <th>étudiant</th>
                    <th>début</th>
                    <th>fin</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {reservations && reservations.map(reservation=>(
                <tr>
                    <td>{reservation.time}</td>
                    <td>{reservation.equipmentName}</td>
                    <td>{reservation.userName}</td>
                    <td>{reservation.startsAt}</td>
                    
                    <td>{reservation.endsAt}</td>
                    {reservation.reservationState === 'UNCHECKED' &&
                    <td><button className={styles.btn_confirmer} onClick={()=>confirmer(reservation.id)}>confirmer</button></td>}
                    {reservation.reservationState === 'UNCHECKED' &&
                    <td><button className={styles.btn_annuler} onClick={()=>setReservationId(reservation.id)}>annuler</button></td>}

                    {reservation.reservationState === 'CONFIRMED' &&
                    <td className={styles.confirmed}>CONFIRMÉ</td>}
                    {reservation.reservationState === 'CONFIRMED' &&
                    <td><button className={styles.btn_annuler} onClick={()=>deleteReservation(reservation.id)}>supprimer</button></td>}

                    {reservation.reservationState === 'REJECTED' &&
                    <td className={styles.rejected}>ANNULÉ</td>}
                    {reservation.reservationState === 'REJECTED' &&
                    <td><button className={styles.btn_annuler} onClick={()=>deleteReservation(reservation.id)}>supprimer</button></td>}

                </tr>
            ))}
            </tbody>
        </table>

        {reservationId && <div className={styles.message}>
            <h3>ajouter une clarification</h3>
            <textarea name="message" value={message} onChange={(event)=>setMessage(event.target.value)}></textarea>
            <button onClick={()=>annuler()}>envoyer</button>
            <button onClick={()=>setReservationId('')}>retour</button>
        </div>}

    </div>
    );
}
export default Reservations;