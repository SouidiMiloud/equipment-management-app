import React, { Component } from "react";
import './Navbar.css';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons"; // Import the specific icon you want to use

class Navbar extends Component {
    render() {
        return (
            <div>
                <nav className="navbarItems navbar">
                    <h1 className="nav-logo">𝓘𝓝𝓟𝓣</h1>
                    <ul className="menu"> 
                        <li><a className="active" href="/">Home</a></li>
                        <li><a   href="/materials">Materials</a></li>
                        <li><a  href="/about">About</a></li>
                        <li><a  href="/contact">Contact</a></li>
                        <li>
                            <a href="/"><FontAwesomeIcon icon={faCartShopping} /></a>
                            
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }
}

export default Navbar;
