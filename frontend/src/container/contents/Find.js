import React, { Component } from "react";
import { HashLink } from "react-router-hash-link";
import { Divider } from "@material-ui/core";
import "./Find.css";

import { Grid, Paper } from "@material-ui/core"

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Find extends Component {
    render() {
        let classes = {
            cell: "font middleGray bolder cell",
        };
        return (
            this.props.app.allDepartments ?
                <div className="mainbody">
                    <p className="font boldest lightGray find-title">DEPARTMENTS</p>
                    <Grid container direction="row" justify="flex-start" spacing={24}>
                        {
                            this.props.app.allDepartments.map(department =>
                                <Grid item>
                                    <Paper className={classes.paper}>
                                        <HashLink to={`/teachers#department-${department.name}`} style={{ textDecoration: "none" }}>
                                            <div className={classes.cell}>{department.name}</div>
                                        </HashLink>
                                    </Paper>
                                </Grid>
                            )
                        }
                    </Grid>
                    <Divider style={{margin: "30px 0"}} />
                    <p className="font boldest lightGray find-title">SUBJECTS</p>
                    <Grid container direction="row" justify="flex-start" spacing={24}>
                        {
                            this.props.app.allSubjects.map(subject =>
                                <Grid item>
                                    <Paper className={classes.paper}>
                                        <HashLink to={`/courses#subject-${subject.name}`} style={{ textDecoration: "none" }}>
                                            <div className={classes.cell}>{subject.name}</div>
                                        </HashLink>
                                    </Paper>
                                </Grid>
                            )
                        }
                    </Grid>
                </div >
                :
                <p style={{ color: "white" }}>placeholder</p>
        );
    };
}

export default Find;
