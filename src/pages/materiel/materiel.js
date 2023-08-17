import React from 'react';
import styles from "../../styles/materiel.module.css";
import Navbar from "../../components/navbar.js";
import SearchBar from "./SearchBar";
import ProductCards from "./productcard";
import ProductListing from "./productlisting";


function Materials() {
    return (
        <div className={styles.banner}>
            <Navbar />
            <SearchBar />

            <ProductListing />
            <ProductCards />
            
        </div>

    )
}
export default Materials;