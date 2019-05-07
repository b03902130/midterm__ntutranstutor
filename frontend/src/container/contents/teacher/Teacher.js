import React, { Component } from "react";
import { Grid } from "@material-ui/core"
import roots from '../../../root';
import './Teacher.css';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import ButtonMaterial from '@material-ui/core/Button';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teacher extends Component {
    render() {
        let teacher, courses, privilege;
        if (this.props.app.teachers) {
            teacher = this.props.app.teachers.infos[this.props.match.params.id];
            courses = teacher.courses.map(id => this.props.app.courses.infos[id]);
            privilege = roots.includes(this.props.app.googleid) || this.props.match.params.id === this.props.app.teacherid;
        }
        return (
            <div>
                {
                    privilege && <button onClick={err => {
                        this.props.app.postAxios("/alias", { teacherid: this.props.match.params.id }, data => {
                            this.props.app.changeTeacherId(this.props.match.params.id);
                        });
                    }}>轉換教師身分</button>
                }
                {
                    teacher &&
                    <div id="panel">
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                            <Grid item sm={12} md={6} className="subpanel">
                                <img id="teacherImg" src={teacher.imgurl} />
                            </Grid>
                            <Grid item sm={12} md={6} className="subpanel">
                                <div id="teacherText">
                                    <div>
                                        <span id="name">{teacher.name}</span>
                                        <span id="department">{teacher.department.name}</span>
                                    </div>
                                    <Paper style={{ margin: "20px 0 20px 0" }}>
                                        <p>{teacher.description}</p>
                                    </Paper>
                                    <Divider style={{ margin: "30px 0 10px 0" }} />
                                    {
                                        privilege && (
                                            <ButtonMaterial variant="contained" style={{ border: "#2196f3 1px solid", backgroundColor: "#2196f3", padding: "0", marginLeft: "5px", marginTop: "15px" }}>
                                                <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 24px 3px 24px" }}>加新課程</span>
                                            </ButtonMaterial>
                                        )
                                    }
                                    {
                                        courses.map(course => (
                                            <Card className="course-card" style={{ margin: "30px 0 30px 0" }}>
                                                <Card.Header style={{
                                                    fontFamily: 'Noto Serif TC',
                                                    fontWeight: 900,
                                                    fontSize: 20,
                                                    color: "black"
                                                }}>{course.subject.name}</Card.Header>
                                                <Card.Body>
                                                    <Card.Title style={{ marginBottom: "5px" }}><span id="price">{course.price}</span></Card.Title>
                                                    <Card.Text style={{ marginBottom: "5px" }}>{course.description}</Card.Text>
                                                    {/* <Link to={`/`}><Button style={{ margin: "0 5px 5px 0" }} variant="success">編輯課程</Button></Link> */}
                                                    {/* <Button id="a" style={{ margin: "0 5px 5px 0", backgroundColor: "black" }} variant="danger" onClick={this.deleteCourse}>刪除課程</Button> */}

                                                    {
                                                        privilege && (
                                                            <div>
                                                                <ButtonMaterial variant="contained" style={{ border: "#26a69a 1px solid", backgroundColor: "#26a69a", padding: "0" }}>
                                                                    <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 18px 3px 18px" }}>編 輯</span>
                                                                </ButtonMaterial>
                                                                <ButtonMaterial variant="contained" style={{ border: "#f44336 1px solid", backgroundColor: "#f44336", padding: "0", marginLeft: "15px" }}>
                                                                    <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 18px 3px 18px" }}>刪 除</span>
                                                                </ButtonMaterial>
                                                            </div>
                                                        )
                                                    }
                                                </Card.Body>
                                            </Card>
                                        ))
                                    }

                                </div>

                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        );
    };
}

export default Teacher;
