import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import { Dropdown, DropdownButton } from "react-bootstrap";
import Imgur from './Imgur';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class TeacherEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            info: {
                id: "",
                name: "",
                department: "",
                imgurl: "",
                description: "",
            },
            filename: "Choose file",
            submitted: false,
        };
        this.registered = false;
    }

    componentDidMount() {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/edit", data => {
            this.setState({ info: data.info });
        });
    }

    imgLoaded = (e) => {
        if (!this.registered) {
            this.registered = true;
            this.uploader = new Imgur({
                targetClass: ".imgurUploader",
                clientid: '428e97466328a8c',
                callback: this.imageUploaded
            });
        }
    }

    imageUploaded = (res) => {
        if (res.success === true) {
            console.log(`Image uploaded to Imgur: ${res.data.link}`);
            this.setState(state => ({ info: { ...state.info, imgurl: res.data.link } }));
        }
    };

    fileSelected = (e) => {
        this.setState({ filename: e.target.files[0].name.slice(0, 23) });
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

    submit = () => {
        if (this.state.info.description === "" || this.state.info.name === "") {
            alert("請完整填寫資訊");
        }
        else {
            this.props.app.postAxios("/teachers/" + this.props.match.params.id + "/put", this.state.info, data => {
                this.setState({ submitted: true });
                this.props.app.updateDatabase();
            });
        }
    }

    delete = () => {
        this.props.app.getAxios("/teachers/" + this.props.match.params.id + "/delete", data => {
            this.setState({ submitted: true });
            this.props.app.updateSession();
            this.props.app.updateDatabase();
        });
    }

    render() {
        return (
            <div>
                {
                    !this.props.app.identity || this.props.app.identity === "outsider" ?
                        <Redirect to="/" /> :
                        // <p>You are not authorized</p>
                        this.state.submitted ?
                            <Redirect to={`/teachers/${this.props.app.teacherid}`} />
                            :
                            <div className="TeacherForm">
                                <div className="custom-file imgurUploader" style={{ width: "300px" }}>
                                    <input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={this.fileSelected} />
                                    <label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.filename}</label>
                                </div>
                                <img style={{width: "200px"}} alt="teacher" src={this.state.info.imgurl} onLoad={this.imgLoaded} />

                                <div>
                                    <label htmlFor="teacher_name">教師名稱</label>
                                    <input id="teacher_name" value={this.state.info.name} onChange={this.change} />
                                </div>
                                <DropdownButton title={this.state.info.department}>
                                    {
                                        this.props.app.departmentOptions.map(department =>
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
                                <div><button type="submit" onClick={this.submit}>更新教師資訊</button></div>
                                <div><button type="submit" onClick={this.delete}>刪除教師帳號（包含所有課程）</button></div>
                            </div>
                }
            </ div >
        );
    };
}

export default TeacherEdit;
