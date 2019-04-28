import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './Home';
import Teachers from './Teachers';
import Subjects from './Subjects';
import About from './About';
import Person from './Person';

class Content extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/teachers" component={Teachers} />
                <Route path="/subjects" component={Subjects} />
                <Route path="/about" component={About} />
                <Redirect to="/" />
            </Switch>
        );
    }
}

export default Content; 