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
            session: undefined
        };
    }

    async componentDidMount() {
        this.refresh();
    }

    // tool function used to test the session status
    async getAxios(operation) {
        const { data } = await Axios.get(renderURI("/axios/") + operation);
        console.log(data);
    }
    async postAxios(operation) {
        const { data } = await Axios.post(renderURI("/axios/") + operation);
        console.log(data);
    }

    logout = async () => {
        await Axios.get(renderURI("/axios/logout"));
        this.setState({ session: undefined });
    }

    refresh = async () => {
        const { data } = await Axios.get(renderURI("/axios/session"));
        this.setState({ session: data.session });
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Navigator session={this.state.session} testSession={() => { this.getAxios("connection") }} logout={this.logout} />
                        <Content session={this.state.session} refresh={this.refresh} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
