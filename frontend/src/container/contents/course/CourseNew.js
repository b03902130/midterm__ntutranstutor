import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownButton } from "react-bootstrap";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class CourseNew extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                id: "",
                subject: "科目名稱",
                price: "",
                description: ""
            },
            submitted: false,
        }
    }

    change = (e) => {
        let content = e.target.value;
        if (e.target.id === "course_price") {
            this.setState(state => ({ info: { ...state.info, price: content } }));
        }
        else if (e.target.id === "course_description") {
            this.setState(state => ({ info: { ...state.info, description: content } }));
        }
    }

    submit = () => {
        if (this.state.info.subject === "科目名稱") {
            alert("請選擇科目名稱");
        }
        else if (this.state.info.price === "" || this.state.info.description === "") {
            alert("請完整填寫資訊");
        }
        else {
            this.props.app.postAxios("/courses", this.state.info, data => {
                this.setState({ submitted: true });
                this.props.app.updateDatabase();
            });
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.app.identity || this.props.app.identity === "outsider" ?
                        <Redirect to="/" />
                        // <p>You are not authorized</p>
                        :
                        this.state.submitted ?
                            <Redirect to={`/teachers/${this.props.app.teacherid}/courses`} />
                            :
                            <div className="course_form">
                                <DropdownButton title={this.state.info.subject}>
                                    {
                                        this.props.app.subjectOptions.map(subject =>
                                            <Dropdown.Item><div onClick={e => {
                                                let selected = e.target.innerText;
                                                this.setState(state => ({ info: { ...state.info, subject: selected } }))
                                            }}>{subject}</div></Dropdown.Item>)
                                    }
                                </DropdownButton>
                                <div>
                                    <label htmlFor="course_price">預期費用</label>
                                    <input id="course_price" value={this.state.info.price} onChange={this.change} />
                                </div>
                                <div>
                                    <label htmlFor="course_description">課程介紹</label>
                                    <textarea id="course_description" value={this.state.info.description} onChange={this.change} />
                                </div>
                                <div><button type="submit" onClick={this.submit}>submit</button></div>
                            </div>
                }
            </ div >
        );
    };
}

export default CourseNew;
