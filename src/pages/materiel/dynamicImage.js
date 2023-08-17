import React from 'react';


const DynamicImage = ({ imageUrl, altText }) => {
    return <img src={imageUrl} alt={altText} />;
};

export default DynamicImage;
