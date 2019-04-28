import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Home extends Component {
    render() {
        return (
            <h1>This is home</h1>
        );
    };
}

export default Home;
