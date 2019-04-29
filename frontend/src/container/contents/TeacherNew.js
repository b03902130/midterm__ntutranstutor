import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import renderURI from '../../renderURI';

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
            await Axios.post(renderURI("/axios/teachers"), { description: this.state.description })
                .catch((error) => {
                    if (error.response) {
                        alert(error.response.data);
                    }
                });
            this.props.refresh();
            this.setState({ submitted: true });
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.session || this.props.session.identity === "outsider" ?
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
                            </div>

                }
            </ div >
        );
    };
}

export default TeacherNew;
