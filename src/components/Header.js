import React, { Component } from 'react';
import '../App.css';
import logo from '../assets/logo.png';
import {
    NavLink
} from "react-router-dom";

class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }

    render() {
        return (
            <header>
                <div className="main">
                    <img alt="logo" src={logo} />
                    <div className="title">
                        <h1>{this.props.project_name}</h1>
                        <h3>by {this.props.my_name}</h3>
                        <div className="menu">
                            <NavLink exact to="/">Home</NavLink>
                            <NavLink exact to="/dashboard">Dashboard</NavLink>
                        </div>
                    </div>
                </div>
            </header>
        )
    }
}

export default Header;