import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Subjects extends Component {
    render() {
        return (
            <h1>These are subjects</h1>
        );
    };
}

export default Subjects;
