import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar.js";
import styles from "../../styles/details.module.css"
import arduino from "../../Assets/images/arduino.jpg"
import raspberry from '../../Assets/images/raspberry.jpeg'
import ram from '../../Assets/images/ram.jpg'
import stm32 from '../../Assets/images/STM32.png'
import breadboard from '../../Assets/images/breadboard.jpg'

function Details(){
    
    const [materiel, setMateriel] = useState({});
    const jwt = localStorage.getItem('jwt');

    const [info, setInfo] = useState({
        equipmentId:'',
        userId: '',
        startsAt: '',
        endsAt: ''
    });

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const material = params.get('materialId');
        
        fetch(`http://localhost:8090/details?id=${material}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'GET'
        })
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
            throw new Error('Request failed with status: ' + response.status);
            }
        })
        .then(data => {
            setMateriel(data);
            setInfo((prev)=>({
                ...prev,
                equipmentId: material
            }))
        })
        .catch(error => {
            alert(error.message);
        });

    }, []);

    const changeInput = (e)=>{
        const {name, value} = e.target;
        setInfo((prev)=>({
            ...prev,
            [name]: value
        }));
    }

    const reserve = ()=>{
        fetch(`http://localhost:8090/reservation`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${jwt}`,
            },
            method: "POST",
            body: JSON.stringify(info)
        })
        .then((response)=>{
            if(response.status === 200){
                return response.text();
            }
        })
        .then(text=>alert(text));
        
    }

    return(
        <div>
            {materiel &&
            <div>
                <Navbar/>
                <div style={{display: "flex"}}>
                    <div className={styles.product_img}>
                        {materiel.imagePath === 'arduino.jpg' && <img className={styles.image} src={arduino} alt={materiel.name} />}
                            {materiel.imagePath === 'raspberry.jpeg' && <img className={styles.image} src={raspberry} alt={materiel.name} />}
                            {materiel.imagePath === 'ram.jpg' && <img className={styles.image} src={ram} alt={materiel.name} />}
                            {materiel.imagePath === 'STM32.png' && <img className={styles.image} src={stm32} alt={materiel.name} />}
                            {materiel.imagePath === 'breadboard.jpg' && <img className={styles.image} src={breadboard} alt={materiel.name} />}
                    </div>
                    <div className={styles.description}>
                        <h2>{materiel.name}</h2>
                        <div className={styles.text_desc}></div>
                        <h3 style={{color: "green"}}>{materiel.message}</h3>
                        <div className={styles.form_div}>
                            <label className={styles.label}>date de prise</label>
                            <input type="datetime-local" name="startsAt" value={info.startsAt} onChange={changeInput} className={styles.reserv_date} placeholder="date de prise"/>
                        </div>
                        <div className={styles.form_div}>
                            <label className={styles.label}>date de remise</label>
                            <input type="datetime-local" name="endsAt" value={info.endsAt} onChange={changeInput} className={styles.reserv_date} placeholder="date de remise"/>
                        </div>
                        <button className={styles.form_btn} onClick={reserve}>reserver</button>
                    </div>
                </div>
            </div>}
        </div>
    );
}
export default Details;