import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './contents/Home';
import Teachers from './contents/Teachers';
import Teacher from './contents/Teacher';

import TeacherNew from './contents/TeacherNew';
import Subjects from './contents/Subjects';
import About from './contents/About';
import TeacherEdit from "./contents/TeacherEdit";
// import Person from './contents/Person';

class Content extends Component {
    render() {
        return (
            <div className="Content">
                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/teachers" component={Teachers} />
                    <Route exact path="/teacher/new" render={(props) => {
                        return <TeacherNew {...props} session={this.props.session} refresh={this.props.refresh} />
                    }} />
                    <Route exact path="/teachers/:id" component={Teacher} />
                    <Route exact path="/teachers/:id/edit" render={(props) => {
                        return <TeacherEdit {...props} session={this.props.session} />
                    }} />

                    <Route path="/subjects" component={Subjects} />
                    <Route path="/about" component={About} />
                    <Redirect to="/" />
                </Switch>
            </div>
        );
    }
}

export default Content; 