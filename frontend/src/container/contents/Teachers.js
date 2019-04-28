import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        return (
            <h1>These are teachers</h1>
        );
    };
}

export default Teachers;
