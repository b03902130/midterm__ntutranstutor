import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownButton } from "react-bootstrap";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                name: "",
                department: "",
                imgurl: "",
                description: "",
            },
            submitted: false,
        }
    }

    componentDidMount() {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/edit", data => {
            this.setState({ info: data.info });
        });
    }

    change = (e) => {
        let content = e.target.value;
        if (e.target.id === "teacher_name") {
            this.setState(state => ({ info: { ...state.info, name: content } }));
        }
        else if (e.target.id === "teacher_description") {
            this.setState(state => ({ info: { ...state.info, description: content } }));
        }
    }

    submit = async () => {
        if (this.state.info.description === "") {
            alert("請填寫教師個人介紹");
        }
        else {
            this.props.app.postAxios("/teachers/" + this.props.match.params.id + "/put", this.state.info, data => {
                this.setState({ submitted: true });
            });
        }
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
                                <DropdownButton title={this.state.info.department}>
                                    {
                                        this.props.app.departmentInfo.names.map(department =>
                                            <Dropdown.Item><div onClick={e => {
                                                let selected = e.target.innerText;
                                                this.setState(state => ({ info: { ...state.info, department: selected } }))
                                            }}>{department}</div></Dropdown.Item>)
                                    }
                                </DropdownButton>
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
