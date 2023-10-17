import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar.js";
import styles from "../../styles/productForm.module.css";

function ProductForm() {

    const [info, setInfo] = useState({
        name: '',
        category: 'MICROCONTROLLEUR',
        description: ''
    });
    const [categoryOpen, setCategoryOpen] = useState(false);
    const [productId, setProductId] = useState('');
    const [file, setFile] = useState(null);

    useEffect(()=>{
        const params = new URLSearchParams(window.location.search);
        if(params.has('productId')){
            const id = params.get('productId');
            setProductId(id);
            fetch(`http://localhost:8090/product/getProductInfo?productId=${id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
                method: 'GET'
            })
            .then(response=>{if(response.status === 200) return response.json();})
            .then(data=>setInfo(data));
        }
        else
            setProductId('-1');
    }, [])

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

    const addEquipment = (event)=>{

        event.preventDefault();
        const formData = new FormData();
        formData.append("file", file);

        formData.append('name', info.name);
        formData.append('category', info.category);
        formData.append('description', info.description);

        fetch(`http://localhost:8090/product/addProduct?productId=${productId}`, {
            headers:{
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
            method: 'POST',
            body: formData
        })
        .then((response)=>{
            if(response.status === 200)
                window.location.href='/product/new';
        })
    }

    return (
        <div className={styles.banner}>
            <Navbar />
            {productId && 
            <div className={styles.container}>
                
                <form onSubmit={addEquipment}>
                    <h2> nouveau produit </h2>
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

                            <input type="file" name='imagePath' onChange={(e)=>{setFile(e.target.files[0])}} id="image" />
                        </div>
                    
                        <div className={styles.inputbox}>
                            <span className={styles.details}> description </span>

                            <input type="text" name='description' value={info.description} onChange={changeInfo} id="description" placeholder="ajoutez une description" />
                        </div>
                        
                    </div>
                    
                    <button type="submit" className={styles.btn} value="Register">{productId === '-1' ? 'ajouter' : 'modifier'}</button>
                    

                </form>
            </div>}

        </div>
    );
}

export default ProductForm;