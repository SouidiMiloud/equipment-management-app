import React, { useState } from "react";
import styles from "../../styles/searchbar.module.css";

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Search Term:", searchTerm);
    };

    return (
        <div className={styles.searchbarcontainer}>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleChange}
                    placeholder="Search for products..."
                />
                <button type="submit">Search</button>
            </form>
        </div>
    );
};

export default SearchBar;
