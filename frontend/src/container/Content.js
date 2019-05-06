import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';
import ScrollUpButton from "react-scroll-up-button";

import Home from './contents/Home';
import TeacherController from './contents/TeacherController';
import CourseController from './contents/CourseController';
import Find from './contents/Find'

class Content extends Component {
    render() {
        return (
            <div className="Content" style={{paddingTop: "60px"}}>
                <ScrollUpButton />
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/teachers" render={(props) => {
                        return <TeacherController {...this.props} {...props} />
                    }} />
                    <Route path="/courses" render={(props) => {
                        return <CourseController {...this.props} {...props} />
                    }} />
                    <Route path="/find" component={Find} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Content; 