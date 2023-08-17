import React from "react";
import Navbar from "../Navbar";
import "./materials.css";


import SearchBar from "./SearchBar";
import ProductListing from "./productlisting";

function Materials() {
    

    return (
        <div className="container">
            <Navbar />
            <div className="container">
                <div className="product">
                <SearchBar />
                <ProductListing />
                </div>
                <div></div>
                
            </div>
        </div>
    );
}

export default Materials;