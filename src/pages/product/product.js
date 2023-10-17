import React, { useState } from 'react';
import styles from "../../styles/product.module.css";
import Navbar from "../../components/navbar.js";
import SearchBar from "./SearchBar";
import ProductListing from "./productlisting";


function Products() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term)=>{
        setSearchTerm(term);
    }
    return (
        <div className={styles.banner}>
            <Navbar />
            <SearchBar onSearch = {handleSearch} />

            <ProductListing searchTerm = {searchTerm} />
        </div>

    )
}
export default Products;