import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar";
import styles from "../../styles/reservations.module.css";
import fetchData from "../../config/api";


function Reservations(){

    const [reservations, setReservations] = useState([]);
    const [reservationId, setReservationId] = useState('');
    const [message, setMessage] = useState('');

    const [navbarChanged, setNavbarChanged] = useState(false);

    useEffect(()=>{
        fetchData('/reservation/getReservations', 'GET', '')
        .then(data=>setReservations(data));

    }, [navbarChanged])

    const confirmer = (id)=>{
        fetchData('/reservation/confirmReservation', 'POST', {reservationId: id});
    }

    const annuler = ()=>{
        setReservationId('');
        fetchData('/reservation/rejectReservation', 'POST', {reservationId: reservationId, message: message});
    }

    const deleteReservation = (reservationId)=>{
        fetchData('/reservation/deleteReservation', 'POST', {reservationId, reservationId})
        .then(()=>{setNavbarChanged(!navbarChanged)})
    }

    return(
    <div>
        <Navbar navbarChanged={navbarChanged} setNavbarChanged={setNavbarChanged}/>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>date</th>
                    <th>produit</th>
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
                    <td>{reservation.productName}</td>
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