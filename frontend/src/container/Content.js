import React, { Component } from "react";
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './contents/Home';
import Teachers from './contents/Teachers';
import Subjects from './contents/Subjects';
import About from './contents/About';
// import Person from './contents/Person';

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