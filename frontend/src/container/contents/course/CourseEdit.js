import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Grid from "@material-ui/core/Grid";
import ButtonMaterial from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class CourseEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                id: "loading",
                subject: "loading",
                price: "loading",
                description: "loading"
            },
            submitted: false,
        }
    }

    componentDidMount = () => {
        this.props.app.getAxios("/courses/" + this.props.match.params.id + "/edit", data => {
            this.setState(state => {
                Object.keys(state.info).forEach(field => {
                    state.info[field] = data.info[field];
                });
                return state;
            });
        });
    }

    courseChange = prop => event => {
        let content = event.target.value;
        this.setState(state => {
            state.info[prop] = content;
            return state;
        });
    };

    submit = () => {
        if (this.state.info.subject === "科目名稱") {
            alert("請選擇科目名稱");
        }
        else if (this.state.info.price === "" || this.state.info.description === "") {
            alert("請完整填寫資訊");
        }
        else {
            this.props.app.postAxios(`/courses/${this.props.match.params.id}/put`, this.state.info, data => {
                this.setState({ submitted: true });
                this.props.app.updateDatabase();
            });
        }
    }

    render() {
        let imgurl;
        if (this.props.app.teachers && this.props.app.teacherid) {
            imgurl = this.props.app.teachers.infos[this.props.app.teacherid].imgurl
        }
        return (
            <div>
                {
                    !this.props.app.identity || this.props.app.identity === "outsider" ? <Redirect to="/" /> :
                        this.state.submitted ? <Redirect to={`/teachers/${this.props.app.teacherid}`} /> :
                            imgurl &&
                            <div id="panel">
                                <Grid container direction="row" justify="space-evenly" alignItems="flex-start">
                                    <Grid item sm={12} md={6} className="subpanel">
                                        <img alt="teacher" id="teacherImg" src={imgurl} />
                                    </Grid>
                                    <Grid item sm={12} md={6} className="subpanel">
                                        <div id="teacherText" style={{ marginTop: "20px" }}>
                                            <TextField
                                                select
                                                InputProps={{
                                                    style: {
                                                        fontSize: "30px",
                                                        display: "block",
                                                        fontWeight: 900,
                                                        color: "#546e7a",
                                                        fontFamily: "Noto Serif TC"
                                                    }
                                                }}
                                                variant="outlined"
                                                label="科目名稱"
                                                value={this.state.info.subject}
                                                onChange={this.courseChange('subject')}
                                                style={{ margin: "15px 0 15px 0", minWidth: "200px" }}
                                                placeholder="請選擇你的科目"
                                            >
                                                {this.props.app.subjectOptions.map(option => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </TextField>
                                            <TextField
                                                id="priceEdit"
                                                label="預定價格"
                                                value={this.state.info.price}
                                                onChange={this.courseChange('price')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{
                                                    margin: "15x 0 15px 0",
                                                    display: "block",
                                                }}
                                                placeholder="800/hr"
                                            />
                                            <TextField
                                                label="課程介紹"
                                                fullWidth multiline
                                                value={this.state.info.description}
                                                onChange={this.courseChange('description')}
                                                margin="normal"
                                                variant="outlined"
                                                style={{ margin: "30px 0 15px 0" }}
                                                rowsMax={100}
                                                rows={13}
                                                placeholder="因為我每天都大喊三聲高雄發大財，成績變好、交到女友、也考上台大了！"
                                                InputProps={{
                                                    style: {
                                                        fontSize: "16px",
                                                        display: "block",
                                                        fontWeight: 700,
                                                        color: "#546e7a",
                                                        fontFamily: "Noto Serif TC",
                                                        width: "100%"
                                                    }
                                                }}
                                            />
                                            <div style={{ marginBottom: "30px" }}>
                                                <ButtonMaterial onClick={this.submit} variant="contained" style={{ border: "#26a69a 1px solid", backgroundColor: "#26a69a", padding: "0", marginRight: "12px", marginTop: "12px" }}>
                                                    <span style={{ fontSize: "16px", color: "white", fontWeight: 700, margin: "0", padding: "0 24px 3px 24px" }}>儲 存</span>
                                                </ButtonMaterial>
                                            </div>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                }
            </ div >
        );
    };
}

export default CourseEdit;
