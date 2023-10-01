import React, { useState, useEffect } from "react";
import styles from  "../../styles/productlisting.module.css"; // Create a CSS file for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";


const ProductListing = ({searchTerm}) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [done, setDone] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ["Tout", "Microcontrolleur", "Capteur", "Memoire"];
    const [nameAndRole, setNameAndRole] = useState({});

    useEffect(()=>{
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

        setSelectedCategory("Tout");
        getMeterials("Tout", searchTerm);
    }, [searchTerm])

    const getMeterials = (category, searchTerm)=>{
        setSelectedCategory(category);
        fetch(`http://localhost:8090/getMaterials?category=${category}&searchTerm=${searchTerm}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'GET'
        })
        .then(response => {
            if (response.status === 200) {
                setDone(true);
                return response.json();
            } else {
            throw new Error('Request failed with status: ' + response.status);
            }
        })
        .then(data => {
            setFilteredProducts(data);
        })
        .catch(error => {
            alert(error.message);
        });
    }

    const sendRequest = (materialId)=>{

        window.location.href=`/materiel/details?materialId=${materialId}`;
    }

    const removeMaterial = (id)=>{
        fetch('http://localhost:8090/removeMaterial', {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: JSON.stringify({id: id})
        })
        .then(response=>{
            if(response.status === 200)
                getMeterials(selectedCategory, searchTerm);
        })
    }

    return (
        <div>
        {done &&
        <div className={styles.productlistingcontainer}>
           
            <div className={styles.categorynavigation}>
                <ul>
                    {categories.map((category) => (
                        <li
                            key={category}
                            className={selectedCategory === category ? styles.active : ""}
                            onClick={() => getMeterials(category, searchTerm)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div> 

            <div className={styles.productlist}>
                {filteredProducts.map((product) => (
                    <div className={styles.productcard} key={product.id}>
                        
                        {new Date() > new Date(product.availableAt) ?
                        (
                            <span className={`${styles.availabilitybadge} ${styles.available}`}>disponible maintenant</span>
                        ) : (
                            <span className={`${styles.availabilitybadge} ${styles.notavailable}`}>
                                le {new Date(product.availableAt).getDate()}-{new Date(product.availableAt).getMonth() + 1} a
                                {} {new Date(product.availableAt).getHours()}:{new Date(product.availableAt).getMinutes()}
                            </span>
                        )}

                        
                        <img className={styles.img} src={`materiel_images/${product.imagePath}`} alt={product.name}/>

                        <hr></hr>
                        <div className={styles.det}>
                            <h3>{product.name}</h3>
                            <p>description: {product.description}...</p>
                            <a href="" > see more </a>
                            <div className={styles.star}>
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                                <FontAwesomeIcon icon={faStar} />
                            </div>
                            {nameAndRole.role === 'STUDENT' &&
                            <button className={styles.user_btn} onClick={()=>sendRequest(product.id)} >Réserver maintenant</button>
                            }
                            {nameAndRole.role === 'ADMIN' && <div style={{position: "relative"}}>
                                <button className={styles.modifier} onClick={()=>window.location.href=`/materiel/new?productId=${product.id}`} >Modifier</button>
                                <button className={styles.supprimer} onClick={()=>removeMaterial(product.id)} >Supprimer</button>
                            </div>}
                        </div>
                    </div>
                ))}
            </div>
        </div>
        }
        </div>
    );
};

export default ProductListing;
