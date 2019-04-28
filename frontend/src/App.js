import React, { Component } from "react";
import renderURI from './renderURI';
import { BrowserRouter } from 'react-router-dom';

import Content from './container/Content';
import Navigator from "./container/Navigator";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedin: false,
            username: undefined
        };
    }

    async componentDidMount() {
        const { data } = await Axios.get(renderURI("/axios/session"));
        this.setState({ loggedin: data.loggedin, username: data.username });
    }

    // tool function used to test the session status
    async testSession() {
        const { data } = await Axios.get(renderURI("/axios/session"));
        console.log(data);
    }

    logout = async () => {
        const { data } = await Axios.get(renderURI("/axios/logout"));
        console.log(data);
        this.setState({ loggedin: false, username: undefined });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Navigator loggedin={this.state.loggedin} username={this.state.username} testSession={this.testSession} logout={this.logout} />
                        <Content />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
