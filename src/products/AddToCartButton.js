import React from "react";
import "./AddToCartButton.css"; // Create a CSS file for styling

const AddToCartButton = ({ onClick }) => {
    return (
        <button className="add-to-cart-button" onClick={onClick}>
            Add to Cart
        </button>
    );
};

export default AddToCartButton;
