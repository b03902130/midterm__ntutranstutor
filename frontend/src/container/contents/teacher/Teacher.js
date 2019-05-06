import React, { Component } from "react";
import { Grid } from "@material-ui/core"
import roots from '../../../root';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teacher extends Component {
    render() {
        let teacher, courses;
        if (this.props.app.teachers) {
            teacher = this.props.app.teachers.infos[this.props.match.params.id];
            courses = teacher.courses.map(id => this.props.app.courses.infos[id]);
        }
        return (
            <div>
                {
                    roots.includes(this.props.app.googleid) && <button onClick={err => {
                        this.props.app.postAxios("/alias", { teacherid: this.props.match.params.id }, data => {
                            this.props.app.changeTeacherId(this.props.match.params.id);
                        });
                    }}>轉換教師身分</button>
                }
                {
                    teacher &&
                    <Grid container direction="row" justify="center" alignItems="flex-start">
                        <Grid item xs={6} sm={3}></Grid>
                        <Grid item xs={6} sm={3}></Grid>
                    </Grid>
                } 
            </div>
        );
            };
        }
        
        export default Teacher;
