import React, { useState, useEffect } from "react";
import styles from  "../../styles/productlisting.module.css"; // Create a CSS file for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import products from './products.js'; // Adjust the path as needed

import arduino from '../../Assets/images/arduino.jpg'
import raspberry from '../../Assets/images/raspberry.jpeg'
import ram from '../../Assets/images/ram.jpg'
import stm32 from '../../Assets/images/STM32.png'
import breadboard from '../../Assets/images/breadboard.jpg'


const ProductListing = () => {

    const [filteredProducts, setFilteredProducts] = useState([]);
    const [done, setDone] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState("All");

    const uniqueCategories = ["All", ...new Set(products.map((product) => product.category))];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    useEffect(()=>{
        fetch('http://localhost:8090/getMaterials', {
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
    }, [])

    const sendRequest = (materialId)=>{

        window.location.href=`/materiel/details?materialId=${materialId}`;
    }


    /*const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((product) => product.category === selectedCategory);
    */


    return (
        <div>
        {done &&
        <div className={styles.productlistingcontainer}>
            <div className={styles.categorynavigation}>
                <ul>
                    {uniqueCategories.map((category) => (
                        <li
                            key={category}
                            className={selectedCategory === category ? styles.active : ""}
                            onClick={() => handleCategoryChange(category)}
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
                            <span className={`${styles.availabilitybadge} ${styles.available}`}>disponible</span>
                        ) : (
                                <span className={`${styles.availabilitybadge} ${styles.notavailable}`}>non disponible</span>
                        )}

                        {product.imagePath === 'arduino.jpg' && <img className={styles.img} src={arduino} alt={product.name} />}
                        {product.imagePath === 'raspberry.jpeg' && <img className={styles.img} src={raspberry} alt={product.name} />}
                        {product.imagePath === 'ram.jpg' && <img className={styles.img} src={ram} alt={product.name} />}
                        {product.imagePath === 'STM32.png' && <img className={styles.img} src={stm32} alt={product.name} />}
                        {product.imagePath === 'breadboard.jpg' && <img className={styles.img} src={breadboard} alt={product.name} />}

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
                            <button className={styles.btnn} onClick={()=>sendRequest(product.id)} >Réserver maintenant</button>
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
