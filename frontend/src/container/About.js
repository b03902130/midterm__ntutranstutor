import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class About extends Component {
    render() {
        return (
            <h1>This is about</h1>
        );
    };
}

export default About;
