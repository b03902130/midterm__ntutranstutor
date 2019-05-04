import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './contents/Home';
import TeacherController from './contents/TeacherController';
import CourseController from './contents/CourseController';
import About from './contents/About';

class Content extends Component {
    render() {
        return (
            <div className="Content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/teachers" render={(props) => {
                        return <TeacherController {...this.props} {...props} />
                    }} />
                    <Route path="/courses" render={(props) => {
                        return <CourseController {...this.props} {...props} />
                    }} />
                    <Route path="/about" component={About} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Content; 