import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
        }
    }

    componentDidMount() {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/courses", data => {
            this.setState({ courses: data.courses });
        });
    }

    render() {
        return (
            <div>
                {this.state.courses ? <p>您總共有{this.state.courses.length}筆課程</p> : <p>您目前尚未建立課程</p>}
                <Link exact to="/courses/new">建立新課程</Link>
            </ div >
        );
    };
}

export default TeacherCourses;
