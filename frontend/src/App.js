import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';

import renderURI from './renderURI';
import Content from './container/Content';
import Navigator from "./container/Navigator";

import TeacherCard from './component/TeacherCard';

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
			departmentOptions: "",
			subjectOptions: ""
		}
		this.state = {
			// data
			...this.initial,
			teachers: undefined,
			courses: undefined,

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
				});
			},
			updateSession: () => {
				this.state.getAxios("/session", data => {
					this.setState({ ...data.session });
				});
			},
			updateDatabase: () => {
				this.state.getAxios("/database", data => {
					data.teachers.order.sort((id1, id2) => {
						if (data.teachers.infos[id1].department.value < data.teachers.infos[id2].department.value) {
							return -1;
						}
					});
					data.courses.order.sort((id1, id2) => {
						if (data.courses.infos[id1].subject.value < data.courses.infos[id2].subject.value) {
							return -1;
						}
					});
					let teachers = data.teachers;
					let courses = data.courses;
					let allDepartments = [];
					let departmentBin = [];
					let now = teachers.infos[teachers.order[0]].department;
					let As = [];
					let A = ["法律學系法學組", "法律學系司法組", "法律學系財經法學組"];
					let Bs = []; 
					let B = ["物理學系", "土木工程學系", "機械工程學系", "工程科學及海洋工程學系", "生物環境系統工程學系", "生物機電工程學系", "電機工程學系", "資訊工程學系"]
					for (let teacherid of teachers.order) {
						let test = teachers.infos[teacherid].department;
						if (test.value === now.value) {
							departmentBin.push(teacherid);
						}
						else {
							if (A.includes(now.name)) {
								As = As.concat(departmentBin);
							}
							else if (B.includes(now.name)) {
								Bs = Bs.concat(departmentBin);
							}
							else {
								allDepartments.push({name: now.name, values: departmentBin});
							}
							departmentBin = [teacherid];
							now = test;
						}
					}
					if (Bs.length > 0) {
						allDepartments.unshift({name: "B 群組", detail: B, values: Bs});
					}
					if (As.length > 0) {
						allDepartments.unshift({name: "A 群組", detail: A, values: As});
					}
					this.setState({ teachers: teachers, courses: courses, allDepartments: allDepartments });
				});
			},
			changeTeacherId: (id) => {
				this.setState({ teacherid: id });
			}
		};
	}

	componentDidMount() {
		this.state.updateSession();
		this.state.updateDatabase();
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
