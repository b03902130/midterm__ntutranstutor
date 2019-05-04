import React, { Component } from "react";
import { Route, Switch } from 'react-router-dom';

// import Teachers from './teacher/Teachers';
import CourseNew from './course/CourseNew';
// import Teacher from './teacher/Teacher';
// import TeacherEdit from "./teacher/TeacherEdit";
// import TeacherCoursesEdit from './teacher/TeacherCoursesEdit';

class CourseController extends Component {
    render() {
        return (
            <div className="CourseController">
                <Switch>
                    {/* <Route exact path={`${this.props.match.path}/`} render={(props) => {
                        return <Teachers {...this.props} {...props} />
                    }} /> */}
                    <Route exact path={`${this.props.match.path}/new`} render={(props) => {
                        return <CourseNew {...this.props} {...props} />
                    }} />
                    {/* <Route exact path={`${this.props.match.path}/:id`} render={(props) => {
                        return <Teacher {...this.props} {...props} />
                    }} />
                    <Route exact path={`${this.props.match.path}/:id/edit`} render={(props) => {
                        return <TeacherEdit {...this.props} {...props} />
                    }} />
                    <Route exact path={`${this.props.match.path}/:id/courses/edit`} render={(props) => {
                        return <TeacherCoursesEdit {...this.props} {...props} />
                    }} /> */}
                </Switch>
            </div>
        );
    }
}

export default CourseController; 