import React from 'react';
import './LastAnalyse.css';

const lastAnalyse = (props) => (
    <div className="last-analyse">
        <span>The latest face analyse was made on this photo</span>
        <img src={props.base64Src} alt="last-analyse" />
    </div>
)


export default lastAnalyse;