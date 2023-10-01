import React, { useState } from 'react';
import styles from "../../styles/materiel.module.css";
import Navbar from "../../components/navbar.js";
import SearchBar from "./SearchBar";
import ProductCards from "./productcard";
import ProductListing from "./productlisting";


function Materials() {

    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term)=>{
        setSearchTerm(term);
    }
    return (
        <div className={styles.banner}>
            <Navbar />
            <SearchBar onSearch = {handleSearch} />

            <ProductListing searchTerm = {searchTerm} />
            <ProductCards />
            
        </div>

    )
}
export default Materials;