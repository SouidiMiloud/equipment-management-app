import React from 'react';
import "./herocomponent.css";

const HeroComponent = () => {
    return (
        
        <div className=" hero-content">
            <h1 className='text-secondary'>Welcome to our Electronic Equipment Management System</h1>
            <p>Streamline your equipment requests and management</p>
            <a href="/login"><button className="cta-button">Login</button></a>
            <a href="register"><button className="cta-button">Sign up</button></a>
        </div>
        
    );
};

export default HeroComponent;

