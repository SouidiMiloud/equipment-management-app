import React, { useState } from "react";
import "./ProductListing.css"; // Create a CSS file for styling

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import products from './products.js'; // Adjust the path as needed



const ProductListing = () => {
    const [selectedCategory, setSelectedCategory] = useState("All");

    const uniqueCategories = ["All", ...new Set(products.map((product) => product.category))];

    const handleCategoryChange = (category) => {
        setSelectedCategory(category);
    };

    const filteredProducts =
        selectedCategory === "All"
            ? products
            : products.filter((product) => product.category === selectedCategory);

    return (
        <div className="product-listing-container">
            <div className="category-navigation">
                <ul>
                    {uniqueCategories.map((category) => (
                        <li
                            key={category}
                            className={selectedCategory === category ? "active" : ""}
                            onClick={() => handleCategoryChange(category)}
                        >
                            {category}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="product-list">
                {filteredProducts.map((product) => (
                    <div className="product-card" key={product.id}>
                        {product.quantity > 0 ? (
                            <span className="availability-badge available">Available</span>
                        ) : (
                                <span className="availability-badge not-available">Out of Stock</span>
                        )}
                            
                        
                        <img className="img" src={product.imageUrl} alt={product.name} />
                        
                        <hr></hr>
                        <div className="det">
                        <h3>{product.name}</h3>
                        <p>description: {product.description}</p>
                        <a href="" > see more </a>
                        <div className="star">
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                            <FontAwesomeIcon icon={faStar} />
                        </div>
                        <button className="btnn" >Add to Cart</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductListing;
