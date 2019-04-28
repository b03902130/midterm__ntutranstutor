import React, { Component } from "react";
import GoogleButton from "./component/GoogleButton";
import renderURI from './renderURI';
import { BrowserRouter, Router, Route, Redirect, Switch } from 'react-router-dom';

import Home from './container/Home';
import Teachers from './container/Teachers';
import Subjects from './container/Subjects';
import About from './container/About';
import Person from './container/Person';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false
        };
    }

    async componentDidMount() {
        const { data } = await Axios.get(renderURI("/axios/session"));
        this.setState({ loggedin: data });
    }

    async testSession() {
        const { data } = await Axios.get(renderURI("/axios/session"));
        console.log(data);
        return data;
    }

    logout = async () => {
        const { data } = await Axios.get(renderURI("/axios/logout"));
        console.log(data);
        this.setState({ loggedin: false });
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <GoogleButton />
                    <button type="button" onClick={this.testSession}>Test session</button>
                    <button type="button" onClick={this.logout}>Logout</button>

                    <Switch>
                        <Route exact path="/" component={Home} />
                        <Route path="/teachers" component={Teachers} />
                        <Route path="/subjects" component={Subjects} />
                        <Route path="/about" component={About} />
                        <Redirect to="/" />
                    </Switch>
                </div>
            </BrowserRouter>


        );
    }
}

export default App;
