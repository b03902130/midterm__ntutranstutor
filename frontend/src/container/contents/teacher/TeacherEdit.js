import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            submitted: false,
        }
    }

    componentDidMount = async () => {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id, data => {
            this.setState({ description: data.description });
        });
    }

    change = (e) => {
        this.setState({ description: e.target.value });
    }

    submit = async () => {
        this.props.app.postAxios("/teachers/" + this.props.match.params.id + "/put", { description: this.state.description }, data => {
            this.setState({ submitted: true });
        });
    }

    delete = async () => {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/delete", data => {
            this.setState({ submitted: true });
            this.props.app.updateSession();
        });
    }

    render() {
        return (
            <div>
                {
                    !this.props.app.session || this.props.app.session.identity === "outsider" ?
                        <Redirect to="/" />
                        :
                        this.state.submitted ?
                            <Redirect to="/teachers" />
                            :
                            <div className="TeacherForm">
                                <div>
                                    <label htmlFor="teacher_description">個人介紹</label>
                                    <textarea id="teacher_description" value={this.state.description} onChange={this.change} />
                                    <button type="submit" onClick={this.submit}>submit</button>
                                </div>
                                <div>
                                    <button type="submit" onClick={this.delete}>delete</button>
                                </div>
                            </div>

                }
            </ div >
        );
    };
}

export default TeacherEdit;
