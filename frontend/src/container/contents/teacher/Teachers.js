import React, { Component } from "react";
import TeacherCard from '../../../component/TeacherCard';
import Grid from '@material-ui/core/Grid';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        let teachers = this.props.app.teachers;
        let courses = this.props.app.courses;
        let allDepartments = this.props.app.allDepartments;
        return (
            <div style={{ width: "80%", margin: "auto" }}>
                {
                    allDepartments && (
                        allDepartments.map(department =>
                            <div class="teacher_group" >
                                <h2>{teachers.infos[department[0]].department.name}</h2>
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"
                                >
                                    {
                                        department &&
                                        (department.map(teacherid =>
                                            <div style={{ margin: "20px" }}>
                                                <Grid item>
                                                    <TeacherCard teacherid={teacherid} allteachers={teachers.infos} allcourses={courses.infos} />
                                                </Grid>
                                            </div>
                                        ))
                                    }
                                </Grid>
                            </div>
                        )
                    )
                }
            </div>
        );
    };
}

export default Teachers;
