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
                courseid: "",
                subject: "英文",
                price: "123",
                description: "456"
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
        else if (this.state.info.description === "" || this.state.info.price === "") {
            alert("請完整填寫資訊");
        }
        else {
            this.props.app.postAxios("/courses", this.state.info, data => {
                this.setState({ courseid: data.courseid, submitted: true });
            });
        }
    }

    render() {
        return (
            <div>
                {
                    !this.props.app.identity || this.props.app.identity === "outsider" ?
                        <Redirect to="/" />
                        :
                        this.state.submitted ?
                            <Redirect to={`/courses/${this.state.courseid}`} />
                            :
                            <div className="Course_Form">
                                <button onClick={this.submit}>Course form</button>
                                {/* <div>
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
                                <div><button type="submit" onClick={this.submit}>submit</button></div> */}
                            </div>

                }
            </ div >
        );
    };
}

export default CourseNew;
