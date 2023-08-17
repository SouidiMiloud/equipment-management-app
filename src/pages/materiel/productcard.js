import React, { useState } from "react";
import styles from "../../styles/productcard.module.css";

const productsPerPage = 6; // Number of products to show per page

const products = [
    // Sample product data
    // Add more products as needed
];

const ProductCards = () => {
    const [currentPage, setCurrentPage] = useState(1);

    // Calculate total number of pages
    const totalPages = Math.ceil(products.length / productsPerPage);

    // Get the current page's products
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className={styles.productlistingcontainer}>
            <div className={styles.productlist}>
                {currentProducts.map((product) => (
                    <div className={styles.productcard} key={product.id}>
                        {/* Product card content */}
                    </div>
                ))}
            </div>
            <div className={styles.pagination}>
                <button
                    disabled={currentPage === 1}
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    Previous
                </button>
                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index + 1}
                        onClick={() => handlePageChange(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
                <button
                    disabled={currentPage === totalPages}
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default ProductCards;
