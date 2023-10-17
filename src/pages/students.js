import React, { useState, useEffect } from "react";
import styles from "../styles/reservations.module.css"
import Navbar from "../components/navbar";
import fetchData from "../config/api";


const Students = ()=>{

    const [students, setStudents] = useState([]);

    useEffect(()=>{
        fetchData('/user/getStudents', 'GET', '')
        .then(data=>setStudents(data));
    }, []);

    return(
        <>
        <Navbar/>
        <table className={styles.table}>
            <thead>
                <tr>
                    <th>nom</th>
                    <th>prénom</th>
                    <th>niveau</th>
                    <th>filière</th>
                    <th>email</th>
                    <th>téléphone</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student=>(
                    <tr>
                        <td>{student.last_name}</td>
                        <td>{student.first_name}</td>
                        <td>{student.level}</td>
                        <td>{student.field}</td>
                        <td>{student.email}</td>
                        <td>{student.phone}</td>
                    </tr>
                ))}  
            </tbody>
        </table>
        </>
    )
}
export default Students;