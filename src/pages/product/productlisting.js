import React, { useState, useEffect } from "react";
import styles from  "../../styles/productlisting.module.css"; // Create a CSS file for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

import fetchData from "../../config/api";

const ProductListing = ({searchTerm}) => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [done, setDone] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('');
    const categories = ["Tout", "Microcontrolleur", "Capteur", "Memoire"];
    const [nameAndRole, setNameAndRole] = useState({});

    useEffect(()=>{

        fetchData('/user/getNameAndRole', 'GET', '')
        .then(data=>setNameAndRole(data));

        setSelectedCategory("Tout");
        getProducts("Tout", searchTerm);
    }, [searchTerm])

    const getProducts = (category, searchTerm)=>{
        setSelectedCategory(category);

        fetchData(`/product/getProducts?category=${category}&searchTerm=${searchTerm}`, 'GET', '')
        .then(data => {
            setDone(true);
            setFilteredProducts(data);
        })
        .catch(error => {
            alert(error.message);
        });
    }

    const sendRequest = (productId)=>{

        window.location.href=`/product/details?productId=${productId}`;
    }

    const removeProduct = (productId)=>{
        fetchData('/product/removeProduct', 'POST', {"id": productId})
        .then(data=>{
            getProducts(selectedCategory, searchTerm);
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
                            onClick={() => getProducts(category, searchTerm)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div> 

            <div className={styles.productlist}>
                {filteredProducts.map((product) => (
                    <div className={styles.productcard} key={product.id}>
                        
                        <span className={`${styles.availabilitybadge} ${styles.available}`} style={{backgroundColor :`${product.availableItems === 0 ? 'red' : ''}`}}>
                            {`${product.availableItems}/${product.stock} disponibles`}
                        </span>
                        
                        <img className={styles.img} src={`product_images/${product.imagePath}`} alt={product.name}/>

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
                                <button className={styles.modifier} onClick={()=>window.location.href=`/product/new?productId=${product.id}`} >Modifier</button>
                                <button className={styles.supprimer} onClick={()=>removeProduct(product.id)} >Supprimer</button>
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
