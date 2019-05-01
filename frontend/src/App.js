import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';

import renderURI from './renderURI';
import Content from './container/Content';
import Navigator from "./container/Navigator";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class App extends Component {
    constructor(props) {
        super(props);
        this.initial = {
            googleid: "",
            name: "",
            imgurl: "",
            emails: "",
            identity: "",
            teacherid: "",
        }
        this.state = {
            // data
            ...this.initial,

            //  methods
            getAxios: (operation, dataHandler) => {
                Axios.get(renderURI("/axios") + operation)
                    .then(response => { dataHandler(response.data); })
                    .catch(err => { console.log(err); });
            },
            postAxios: (operation, body, dataHandler) => {
                Axios.post(renderURI("/axios") + operation, body)
                    .then(response => { dataHandler(response.data); })
                    .catch(err => { console.log(err); });
            },
            logout: () => {
                this.state.getAxios("/logout", data => {
                    this.setState(this.initial);
                });
            },
            updateSession: () => {
                this.state.getAxios("/session", data => {
                    this.setState({ ...data });
                });
            },
            callback: async (handler) => {
                handler(this);
            }
        };
    }

    componentDidMount() {
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
