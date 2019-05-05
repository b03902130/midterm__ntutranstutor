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
					this.setState({ teachers: data.teachers, courses: data.courses });
				});
			},
			callback: async (handler) => {
				handler(this);
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
