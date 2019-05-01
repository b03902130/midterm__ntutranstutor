import React, { Component } from "react";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teacher extends Component {
    componentDidMount() {
        
    }

    render() {
        return (
            <h1>This is a teacher</h1>
        );
    };
}

export default Teacher;
