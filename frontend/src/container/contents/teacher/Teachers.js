import React, { Component } from "react";
import TeacherCard from '../../../component/TeacherCard';
import Grid from '@material-ui/core/Grid';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        let teachers = this.props.app.teachers;
        let courses = this.props.app.courses;
        return (
            <div class="teacher_group" >
                <Grid
                    container
                    direction="row"
                    justify="center"
                    alignItems="flex-start"
                >
                    {
                        teachers &&
                        (teachers.order.map(teacherid =>
                            <Grid item style={{ margin: "20px" }}>
                                <TeacherCard teacherid={teacherid} allteachers={teachers.infos} allcourses={courses.infos} />
                            </Grid>
                        ))
                    }
                </Grid>
            </div>
        );
    };
}

export default Teachers;
