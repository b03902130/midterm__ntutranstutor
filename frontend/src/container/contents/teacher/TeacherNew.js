import React, { Component } from "react";
import { Redirect } from 'react-router-dom';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            submitted: false,
        }
    }

    change = (e) => {
        this.setState({ description: e.target.value });
    }

    submit = async () => {
        if (this.state.description === "") {
            alert("You must fillout description to become a teacher");
        }
        else {
            this.props.app.postAxios("/teachers", { description: this.state.description }, data => {
                this.setState({ submitted: true });
                this.props.app.updateSession();
            });
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.app.session || this.props.app.session.identity === "outsider" ?
                        <Redirect to="/" />
                        :
                        this.state.submitted ?
                            <Redirect to={`/teachers/${this.props.app.session.teacherid}`} />
                            :
                            <div className="TeacherForm">
                                <div>
                                    <label htmlFor="teacher_description">個人介紹</label>
                                    <textarea id="teacher_description" value={this.state.description} onChange={this.change} />
                                    <button type="submit" onClick={this.submit}>submit</button>
                                </div>
                            </div>

                }
            </ div >
        );
    };
}

export default TeacherNew;
