import React, { Component } from "react";
import TeacherCard from '../../../component/TeacherCard';
import Grid from '@material-ui/core/Grid';

import './Teachers.css';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        let teachers = this.props.app.teachers;
        let courses = this.props.app.courses;
        let allDepartments = this.props.app.allDepartments;
        let idRecorder = {};
        return (
            <div style={{ width: "80%", margin: "auto" }}>
                {
                    allDepartments && (
                        allDepartments.map(department =>
                            <div class="teacher_group" style={{ margin: "50px 0 50px 0" }}>
                                <h3 style={{
                                    margin: "15px 0 15px 0", color: "#90a4ae",
                                    fontWeight: 700, textAlign: "center",
                                }}>{department.name}</h3>
                                {
                                    department.detail && (
                                        <h6 style={{
                                            marginBottom: "15px", color: "#90a4ae",
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
                                            department.values.map(teacherid => {
                                                let teacher = teachers.infos[teacherid];
                                                if (idRecorder[teacher.department.value]) {
                                                    return (
                                                        <div style={{ margin: "20px" }}>
                                                            <Grid item>
                                                                <TeacherCard teacherid={teacherid} allteachers={teachers.infos} allcourses={courses.infos} />
                                                            </Grid>
                                                        </div>
                                                    );
                                                }
                                                else {
                                                    idRecorder[teacher.department.value] = true;
                                                    return (
                                                        <div className="ancher">
                                                            <div id={`department-${teacher.department.value}`} style={{ margin: "20px" }}>
                                                                <Grid item>
                                                                    <TeacherCard teacherid={teacherid} allteachers={teachers.infos} allcourses={courses.infos} />
                                                                </Grid>
                                                            </div>
                                                        </div>
                                                    );
                                                }

                                            }
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
