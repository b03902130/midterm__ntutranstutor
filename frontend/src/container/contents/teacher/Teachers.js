import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    componentDidMount() {
    }

    render() {
        return (
            <h1>These are teachers</h1>
        );
    };
}

export default Teachers;
