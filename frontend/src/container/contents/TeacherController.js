import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import Teachers from './teacher/Teachers';
import TeacherNew from './teacher/TeacherNew';
import Teacher from './teacher/Teacher';
import TeacherEdit from "./teacher/TeacherEdit";

class TeacherController extends Component {
    render() {
        return (
            <div className="TeacherController">
                <Switch>
                    <Route exact path={`${this.props.match.path}/`} render={(props) => {
                        return <Teachers {...this.props} {...props} />
                    }} />
                    <Route exact path={`${this.props.match.path}/new`} render={(props) => {
                        return <TeacherNew {...this.props} {...props} />
                    }} />
                    <Route exact path={`${this.props.match.path}/:id`} component={Teacher} />
                    <Route exact path={`${this.props.match.path}/:id/edit`} render={(props) => {
                        return <TeacherEdit {...this.props} {...props} />
                    }} />
                </Switch>
            </div>
        );
    }
}

export default TeacherController; 