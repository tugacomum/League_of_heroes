import React from 'react';
import loading from '../assets/loader.gif';
import '../App.css';

function Loading(props) {
    return (
        <div className="loading_box">
            <img alt="loading" src={loading} />
            Loading
        </div>
    )
}

export default Loading;