import React, { Component } from "react";
import { ProductCard } from "react-ui-cards";
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';


import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        let teachers = this.props.app.teachers;
        let courses = this.props.app.courses;
        return (
            <div>
                <Button variant="contained" color="primary">
                    Hello World
                </Button>
            </div>
        );
    };
}

export default Teachers;
