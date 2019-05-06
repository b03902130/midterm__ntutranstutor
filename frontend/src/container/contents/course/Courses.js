import React, { Component } from "react";
import TeacherCard from '../../../component/TeacherCard';
import Grid from '@material-ui/core/Grid';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    render() {
        let teachers = this.props.app.teachers;
        let courses = this.props.app.courses;
        let allSubjects = this.props.app.allSubjects;
        return (
            <div style={{ width: "80%", margin: "auto", marginBottom: "50px" }}>
                {
                    allSubjects && (
                        allSubjects.map(subject =>
                            <div class="course_group">
                                <div id={`subject-${subject.name}`} style={{height: "50px"}}></div>
                                <h3 style={{
                                    margin: "15px 0 15px 0", color: "#90a4ae",
                                    fontWeight: 700, textAlign: "center",
                                }}>{subject.name}</h3>
                                {
                                    subject.detail && (
                                        <h6 style={{
                                            marginBottom: "15px", color: "#90a4ae",
                                            fontWeight: 900, textAlign: "center",
                                        }}>{subject.detail.join("　")}</h6>
                                    )
                                }
                                <Grid
                                    container
                                    direction="row"
                                    justify="center"
                                    alignItems="flex-start"
                                >
                                    {
                                        subject.values && (
                                            subject.values.map(courseid => (
                                                <div style={{ margin: "20px" }}>
                                                    <Grid item>
                                                        <TeacherCard teacherid={courses.infos[courseid].teacher} allteachers={teachers.infos} allcourses={courses.infos} />
                                                    </Grid>
                                                </div>
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
