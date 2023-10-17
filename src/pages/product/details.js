import React, {useEffect, useState} from "react";
import Navbar from "../../components/navbar.js";
import styles from "../../styles/details.module.css"
import fetchData from "../../config/api.js";


function Details(){
    
    const [product, setProduct] = useState({});
    const jwt = localStorage.getItem('jwt');

    const [info, setInfo] = useState({
        productId:'',
        userId: '',
        startsAt: '',
        endsAt: ''
    });

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        const product = params.get('productId');
        
        fetchData(`/product/details?id=${product}`, 'GET', '')
        .then(data => {
            setProduct(data);
            setInfo((prev)=>({
                ...prev,
                productId: product
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
        fetchData('/reservation/reservation', 'POST', info)
        .then(text=>alert(text));
    }

    return(
        <div>
            {product &&
            <div>
                <Navbar/>
                <div style={{display: "flex"}}>
                    <div className={styles.product_img}>
                      <img className={styles.image} src={`/product_images/${product.imagePath}`} alt="" />    
                    </div>
                    <div className={styles.description}>
                        <h2>{product.name}</h2>
                        <div className={styles.text_desc}></div>
                        <h3 style={{color: "green"}}>{product.message}</h3>
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