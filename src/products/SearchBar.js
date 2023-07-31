import React, { useState } from "react";
import "./SearchBar.css"; // Create a CSS file for styling

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
        <div className="search-bar-container">
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
