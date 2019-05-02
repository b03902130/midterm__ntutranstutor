import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                name: "",
                imgurl: "",
                description: "",
            },
            submitted: false,
        }
    }

    componentDidMount() {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/edit", data => {
            this.setState({ info: data });
        });
    }

    change = (e) => {
        let content = e.target.value;;
        this.setState(state => {
            state.info.description = content;
            return state;
        });
    }

    submit = async () => {
        this.props.app.postAxios("/teachers/" + this.props.match.params.id + "/put", this.state.info, data => {
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
                    !this.props.app.identity || this.props.app.identity === "outsider" ?
                        <Redirect to="/" />
                        :
                        this.state.submitted ?
                            <Redirect to="/teachers" />
                            :
                            <div className="TeacherForm">
                                <div>
                                    <label htmlFor="teacher_name">教師名稱</label>
                                    <input id="teacher_name" value={this.state.info.name} onChange={this.change} />
                                </div>
                                <div>
                                    <label htmlFor="teacher_description">個人介紹</label>
                                    <textarea id="teacher_description" value={this.state.info.description} onChange={this.change} />
                                </div>
                                <div><button type="submit" onClick={this.submit}>submit</button></div>
                                <div><button type="submit" onClick={this.delete}>delete</button></div>
                            </div>
                }
            </ div >
        );
    };
}

export default TeacherEdit;
