import React, { Component } from "react";
import { Grid } from "@material-ui/core"
import roots from '../../../root';
import './Teacher.css';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import { Card, Button, Row, Col } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';
import ButtonMaterial from '@material-ui/core/Button';
import { HashLink } from 'react-router-hash-link';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teacher extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: "display",
        }
    }

    chagneState = prop => event => {
        this.switchIdentity();
        if (prop === "editTeacher") {
            let teacher = this.props.app.teachers.infos[this.props.match.params.id];
            let info = {
                id: teacher.id,
                name: teacher.name,
                department: teacher.department.name,
                imgurl: teacher.imgurl,
                description: teacher.description,
            }
            this.setState({
                status: prop,
                info: info
            });
        }
    }

    handleTeacherChange = prop => event => {
        let content = event.target.value;
        this.setState(state => {
            state.info[prop] = content;
            return state;
        });
    };

    switchIdentity = () => {
        let teacherid = this.props.match.params.id;
        if (roots.includes(this.props.app.googleid)) {
            this.props.app.postAxios("/alias", { teacherid: teacherid }, data => {
                this.props.app.changeTeacherId(teacherid);
            });
        }
    }

    deleteCourse = (e) => {
        let courseid = e.target.id;
        let teacherid = this.props.match.params.id;
        if (roots.includes(this.props.app.googleid)) {
            this.props.app.postAxios("/alias", { teacherid: teacherid }, data => {
                this.props.app.changeTeacherId(teacherid);
                this.props.app.getAxios(`/courses/${courseid}/delete`, data => {
                    this.refreshCourses();
                    this.props.app.updateDatabase();
                });
            });
        }
    }

    refreshCourses = () => {
        this.props.app.getAxios(`/teachers/${this.props.match.params.id}/courses`, data => {
            this.setState({ courses: data.courses });
        });
    }

    render() {
        let teacher, courses, privilege;
        let departmentName;
        const A = ["法律學系法學組", "法律學系司法組", "法律學系財經法學組"];
        const B = ["物理學系", "土木工程學系", "機械工程學系", "工程科學及海洋工程學系", "生物環境系統工程學系", "生物機電工程學系", "電機工程學系", "資訊工程學系"];
        if (this.props.app.teachers) {
            teacher = this.props.app.teachers.infos[this.props.match.params.id];
            if (teacher) {
                courses = teacher.courses.map(id => this.props.app.courses.infos[id]);
                privilege = roots.includes(this.props.app.googleid) || this.props.match.params.id === this.props.app.teacherid;
                departmentName = teacher.department.name;
                if (A.includes(departmentName)) {
                    departmentName = "A 群組";
                }
                if (B.includes(departmentName)) {
                    departmentName = "B 群組";
                }
            }
        }
        return (
            <div>
                {
                    teacher &&
                    <div id="panel">
                        <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                            <Grid item sm={12} md={6} className="subpanel">
                                <HashLink to={`/teachers#teacher-${teacher.id}`} style={{ textDecoration: "none" }}>
                                    <img id="teacherImg" src={teacher.imgurl} />
                                </HashLink>
                            </Grid>
                            <Grid item sm={12} md={6} className="subpanel">
                                {
                                    this.state.status === "display" && (
                                        <div id="teacherText">
                                            <div>
                                                <HashLink to={`/teachers#teacher-${teacher.id}`} style={{ textDecoration: "none" }}>
                                                    <span id="name">{teacher.name}</span>
                                                </HashLink>
                                                <HashLink to={`/teachers#department-${departmentName}`} style={{ textDecoration: "none" }}>
                                                    <span id="department">{teacher.department.name}</span>
                                                </HashLink>
                                            </div>
                                            <Paper style={{ margin: "20px 0 20px 0" }}>
                                                <p>{teacher.description}</p>
                                            </Paper>
                                            {
                                                !privilege &&
                                                <Divider style={{ margin: "30px 0 10px 0" }} />
                                            }
                                            {
                                                privilege && (
                                                    <div>
                                                        <ButtonMaterial onClick={this.chagneState("editTeacher")} variant="contained" style={{ border: "#2196f3 1px solid", backgroundColor: "#2196f3", padding: "0", marginLeft: "5px", marginTop: "12px" }}>
                                                            <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 24px 3px 24px" }}>編輯教師</span>
                                                        </ButtonMaterial>
                                                        <Link to={`/courses/new`} style={{ textDecoration: "none" }}>
                                                            <ButtonMaterial onClick={this.switchIdentity} variant="contained" style={{ border: "#2196f3 1px solid", backgroundColor: "#2196f3", padding: "0", marginLeft: "15px", marginTop: "12px" }}>
                                                                <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 24px 3px 24px" }}>加新課程</span>
                                                            </ButtonMaterial>
                                                        </Link>
                                                    </div>
                                                )
                                            }
                                            {
                                                courses.map(course => (
                                                    <Card className="course-card" style={{ margin: "30px 0 30px 0" }}>
                                                        <HashLink to={`/courses#subject-${course.subject.name}`} style={{ textDecoration: "none" }}>
                                                            <Card.Header style={{
                                                                fontFamily: 'Noto Serif TC',
                                                                fontWeight: 900,
                                                                fontSize: 20,
                                                                color: "black"
                                                            }}>{course.subject.name}</Card.Header>
                                                        </HashLink>
                                                        <Card.Body>
                                                            <Card.Title style={{ marginBottom: "5px" }}><span id="price">{course.price}</span></Card.Title>
                                                            <Card.Text style={{ marginBottom: "5px" }}>{course.description}</Card.Text>
                                                            {
                                                                privilege && (
                                                                    <div>
                                                                        <Link to={`/courses/${course.id}/edit`}>
                                                                            <ButtonMaterial onClick={e => { this.switchIdentity(); }} variant="contained" style={{ border: "#26a69a 1px solid", backgroundColor: "#26a69a", padding: "0" }}>
                                                                                <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 18px 3px 18px" }}>編 輯</span>
                                                                            </ButtonMaterial>
                                                                        </Link>
                                                                        <ButtonMaterial variant="contained" style={{ border: "#f44336 1px solid", backgroundColor: "#f44336", padding: "0", marginLeft: "15px" }}>
                                                                            <span id={course.id} onClick={(e) => { this.deleteCourse(e); }} style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 18px 3px 18px" }}>刪 除</span>
                                                                        </ButtonMaterial>
                                                                    </div>
                                                                )
                                                            }
                                                        </Card.Body>
                                                    </Card>
                                                ))
                                            }
                                            <div style={{width: "100vw"}}></div>
                                        </div>
                                    )
                                }
                                {
                                    this.state.status === "editTeacher" && this.props.app.teacherid === this.props.match.params.id &&
                                    <div id="teacherText" style={{ marginTop: "18px" }}>
                                        <TextField
                                            id="nameEdit"
                                            label="教師名稱"
                                            required
                                            value={this.state.info.name}
                                            onChange={this.handleTeacherChange('name')}
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: "15px 0 15px 0" }}
                                            placeholder="臺轉會"
                                        />
                                        <TextField
                                            select
                                            required
                                            InputProps={{
                                                style: {
                                                    fontSize: "20px",
                                                    display: "inline-block",
                                                    fontWeight: 700,
                                                    color: "#546e7a",
                                                    fontFamily: "Noto Serif TC"
                                                }
                                            }}
                                            variant="outlined"
                                            label="科系名稱"
                                            value={this.state.info.department}
                                            onChange={this.handleTeacherChange('department')}
                                            style={{ margin: "15px 0 15px 0" }}
                                        >
                                            {this.props.app.departmentOptions.map(option => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            id="descriptionEdit"
                                            label="教師個人介紹"
                                            required fullWidth multiline
                                            value={this.state.info.description}
                                            onChange={this.handleTeacherChange('description')}
                                            margin="normal"
                                            variant="outlined"
                                            style={{ margin: "15px 0 15px 0" }}
                                            rowsMax={100}
                                            rows={12}
                                            placeholder="因為我每天都大喊三聲高雄發大財，成績變好、交到女友、也考上台大了！"
                                            InputProps={{
                                                style: {
                                                    fontSize: "16px",
                                                    display: "inline-block",
                                                    fontWeight: 700,
                                                    color: "#546e7a",
                                                    fontFamily: "Noto Serif TC",
                                                    width: "100%"
                                                }
                                            }}
                                        />
                                        {
                                            !privilege &&
                                            <Divider style={{ margin: "30px 0 10px 0" }} />
                                        }
                                        {
                                            privilege && (
                                                <div>
                                                    <ButtonMaterial onClick={this.switchIdentity} variant="contained" style={{ border: "#26a69a 1px solid", backgroundColor: "#26a69a", padding: "0", marginLeft: "0px", marginTop: "12px" }}>
                                                        <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 24px 3px 24px" }}>儲 存</span>
                                                    </ButtonMaterial>
                                                    <ButtonMaterial onClick={this.switchIdentity} variant="contained" style={{ border: "#f44336 1px solid", backgroundColor: "#f44336", padding: "0", marginLeft: "15px", marginTop: "12px" }}>
                                                        <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 24px 3px 24px" }}>刪除所有教師與課程資料</span>
                                                    </ButtonMaterial>
                                                </div>
                                            )
                                        }
                                    </div>
                                }
                            </Grid>
                        </Grid>
                    </div>
                }
            </div>
        );
    };
}

export default Teacher;
