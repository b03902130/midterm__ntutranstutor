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
                    <Route exact path={`${this.props.match.path}/`} component={Teachers} />
                    <Route exact path={`${this.props.match.path}/new`} render={(props) => {
                        return <TeacherNew {...props} session={this.props.session} refresh={this.props.refresh} />
                    }} />
                    <Route exact path={`${this.props.match.path}/:id`} component={Teacher} />
                    <Route exact path={`${this.props.match.path}/:id/edit`} render={(props) => {
                        return <TeacherEdit {...props} session={this.props.session} refresh={this.props.refresh} />
                    }} />
                </Switch>
            </div>
        );
    }
}

export default TeacherController; 