import React, { useState } from 'react';
import Navbar from "../../components/navbar.js";
import styles from "../../styles/materialForm.module.css";

function MaterielForm() {

    const [info, setInfo] = useState({
        name: '',
        category: 'MICROCONTROLLEUR',
        imagePath: '',
        description: ''
    });
    const [categoryOpen, setCategoryOpen] = useState(false);

    const changeInfo = (event)=>{
        const {name, value} = event.target;
        setInfo((prevInfo)=>({
            ...prevInfo,
            [name]: value
        }))
    };
    const changeCategory = (categoryValue)=>{
        setInfo((prev)=>({
            ...prev,
            category: categoryValue
        }))
        setCategoryOpen(false);
    }

    const addEquipment = ()=>{

        fetch('http://localhost:8090/newEquipment', {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: JSON.stringify(info)
        })
        .then((response)=>{
            if(response.status === 200)
                window.location.href='/materiel/new';
        })
    }

    return (
        <div className={styles.banner}>
            <Navbar />
            <div className={styles.container}>
                
                <form onSubmit={addEquipment}>
                    <h2> nouveau materiel </h2>
                    <div className={styles.frm}> 
                     
                        <div className={styles.inputbox}>
                            <span className={styles.details}> nom </span>
                            <input type="text" name='name' value={info.name} onChange={changeInfo} id="nom" placeholder="tapez le nom" />
                        </div>
                        <div className={styles.inputbox}>
                            <span className={styles.details}> catégorie </span>

                            <div className={styles.dropdown}>
                                <button type="button" className={styles.dropbtn} onClick={()=>{setCategoryOpen(!categoryOpen)}}>{info.category}</button>
                                {categoryOpen && <div className={styles.categoryOptions}>
                                    <button type="button" onClick={()=>changeCategory('MICROCONTROLLEUR')}>MICROCONTROLLEUR</button>
                                    <button type="button" onClick={()=>changeCategory('MEMOIRE')}>MEMOIRE</button>
                                    <button type="button" onClick={()=>changeCategory('CAPTEUR')}>CAPTEUR</button>
                                </div>}
                            </div>
                        </div>
                        <div className={styles.inputbox}>
                            <span className={styles.details}> image </span>

                            <input type="text" name='imagePath' value={info.imagePath} onChange={changeInfo} id="image" placeholder='nom + extension' />
                        </div>
                    
                        <div className={styles.inputbox}>
                            <span className={styles.details}> description </span>

                            <input type="text" name='description' value={info.description} onChange={changeInfo} id="description" placeholder="ajoutez une description" />
                        </div>
                        
                    </div>
                    
                    <button type="submit" className={styles.btn} value="Register">ajouter</button>
                    

                </form>
            </div>

        </div>
    );
}

export default MaterielForm;