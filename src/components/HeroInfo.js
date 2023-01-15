import React from 'react';
import '../App.css';

function HeroInfo(props) {
    return (
        <div className="box">
            <img alt="hero_img" className="hero_img" src={props.img} />
            <div className="title">
                <h4>{props.name}</h4>
            </div>
        </div>
    )
}

export default HeroInfo;