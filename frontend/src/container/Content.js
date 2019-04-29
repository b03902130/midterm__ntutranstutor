import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './contents/Home';
import TeacherController from './contents/TeacherController';

import Subjects from './contents/Subjects';
import About from './contents/About';
// import Person from './contents/Person';

class Content extends Component {
    render() {
        return (
            <div className="Content">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/teachers" render={(props) => {
                        return <TeacherController {...props} session={this.props.session} refresh={this.props.refresh} />
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