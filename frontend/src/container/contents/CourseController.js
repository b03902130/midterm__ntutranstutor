import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

import Courses from './course/Courses';
import CourseNew from './course/CourseNew';
import CourseEdit from "./course/CourseEdit";

class CourseController extends Component {
    render() {
        return (
            <div className="CourseController">
                <Switch>
                    <Route exact path={`${this.props.match.path}/`} render={(props) => {
                        return <Courses {...this.props} {...props} />
                    }} />
                    <Route exact path={`${this.props.match.path}/new`} render={(props) => {
                        return <CourseNew {...this.props} {...props} />
                    }} />
                    <Route exact path={`${this.props.match.path}/:id/edit`} render={(props) => {
                        return <CourseEdit {...this.props} {...props} />
                    }} />
                </Switch>
            </div>
        );
    }
}

export default CourseController; 