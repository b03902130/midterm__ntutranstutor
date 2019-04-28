import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Person extends Component {
    render() {
        return (
            <h1>This is person</h1>
        );
    };
}

export default Person;
