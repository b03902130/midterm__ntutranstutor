import React, { Component } from "react";
import TeacherCard from '../../../component/TeacherCard';


import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        let teachers = this.props.app.teachers;
        let courses = this.props.app.courses;
        return (
            <div>
                {/* <Grid
                    container
                    direction="row"
                    justify="space-evenly"
                    alignItems="flex-start"
                >
                </Grid> */}
                {
                    teachers &&
                    teachers.order.map(teacherid =>
                        <TeacherCard teacherid={teacherid} allteachers={teachers.infos} allcourses={courses.infos} />
                    )
                }
            </div>
        );
    };
}

export default Teachers;
