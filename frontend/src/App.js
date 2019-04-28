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
            user: undefined
        };
    }

    async componentDidMount() {
        const { data } = await Axios.get(renderURI("/axios/session"));
        this.setState({ user: data.user });
    }

    // tool function used to test the session status
    async sendAxios(operation) {
        const { data } = await Axios.get(renderURI("/axios/") + operation);
        console.log(data);
    }

    logout = async () => {
        const { data } = await Axios.get(renderURI("/axios/logout"));
        console.log(data);
        this.setState({ user: undefined });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        {/* <button onClick={() => { this.sendAxios("create") }}>create</button>
                        <button onClick={() => { this.sendAxios("retrieve") }}>retrieve</button> */}
                        <Navigator user={this.state.user} testSession={() => { this.sendAxios("connected") }} logout={this.logout} />
                        <Content />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
