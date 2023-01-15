import React, { Component } from 'react';

class Footer extends Component {
    constructor(props) {
        super(props);

        this.state = {

        }
    }


    render() {
        return (
            <footer >
                {this.props.project_name} - Copyright © 2019 by {this.props.my_name}
            </footer>
        )
    }
}

export default Footer;