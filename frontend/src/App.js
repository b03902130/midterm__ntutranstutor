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
            // data
            session: undefined,

            // methods
            getAxios: async (operation) => {
                const { data } = await Axios.get(renderURI("/axios") + operation);
                return data;
            },
            postAxios: async (operation, body) => {
                const { data } = await Axios.post(renderURI("/axios") + operation, body);
                return data;
            },
            logout: async () => {
                await Axios.get(renderURI("/axios/logout"));
                this.setState({ session: undefined });
            },
            updateSession: async () => {
                const { data } = await Axios.get(renderURI("/axios/session"));
                this.setState({ session: data.session });
            },
            callback: async (handler) => {
                handler(this);
            }
        };
    }

    async componentDidMount() {
        this.state.updateSession();
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    <div>
                        <Navigator app={this.state} />
                        <Content app={this.state} />
                    </div>
                </BrowserRouter>
            </div>
        );
    }
}

export default App;
