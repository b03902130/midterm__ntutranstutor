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
            <div style={{ width: "90%", margin: "auto", marginBottom: "50px" }}>
                {
                    allDepartments && (
                        allDepartments.map(department =>
                            <div class="teacher_group">
                                <div id={`department-${department.name}`} style={{ height: "50px" }}></div>
                                <h3 style={{
                                    margin: "15px", color: "#90a4ae",
                                    fontWeight: 700, textAlign: "center",
                                }}>{department.name}</h3>
                                {
                                    department.detail && (
                                        <h6 style={{
                                            margin: "15px", color: "#90a4ae",
                                            fontWeight: 900, textAlign: "center",
                                        }}>{department.detail.join("　")}</h6>
                                    )
                                }
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"
                                >
                                    {
                                        department.values && (
                                            department.values.map(teacherid => (
                                                <Grid item>
                                                    <div id={`teacher-${teacherid}`} style={{ height: "20px" }}></div>
                                                    <div style={{ margin: "0  20px 20px 20px" }}>
                                                        <TeacherCard teacherid={teacherid} allteachers={teachers.infos} allcourses={courses.infos} />
                                                    </div>
                                                </Grid>
                                            ))
                                        )
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
