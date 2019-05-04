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
            departmentInfo: "",
            subjectInfo: ""
        }
        this.state = {
            // data
            ...this.initial,

            //  methods
            getAxios: (operation, dataHandler) => {
                Axios.get(renderURI("/axios") + operation)
                    .then(response => { dataHandler(response.data); })
                    .catch(err => {
                        if (!err.response) {
                            alert(err);
                        }
                        else {
                            let response = err.response;
                            alert(`${response.status}: ${response.statusText}\n${response.data}`);
                        }
                    });
            },
            postAxios: (operation, data, dataHandler) => {
                Axios.post(renderURI("/axios") + operation, { data: data })
                    .then(response => { dataHandler(response.data); })
                    .catch(err => {
                        if (!err.response) {
                            alert(err);
                        }
                        else {
                            let response = err.response;
                            alert(`${response.status}: ${response.statusText}\n${response.data}`);
                        }
                    });
            },
            logout: () => {
                this.state.getAxios("/logout", data => {
                    this.setState(this.initial);
                    this.state.updateSession();
                });
            },
            updateSession: () => {
                this.state.getAxios("/session", data => {
                    this.setState({ ...data.session });
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
