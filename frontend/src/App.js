import React, { Component } from "react";
import { BrowserRouter } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
			departmentInfo: "",
			subjectInfo: ""
		}
		this.state = {
			// data
			...this.initial,
			filename: "Choose file",
			imgsrc: "",

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
			callback: async (handler) => {
				handler(this);
			}
		};
	}

	componentDidMount() {
		let script = document.createElement("script");
		script.src = "./imgur.js";
		script.async = true;
		document.body.appendChild(script);

		script = document.createElement("script");
		script.src = "./imgurDriver.js";
		script.async = true;
		document.body.appendChild(script);

		this.state.updateSession();
	}

	fileSelected = (e) => {
		this.setState({ filename: e.target.files[0].name.slice(0, 23) });
	}

	imageUploaded = (e) => {
		this.setState({ imgsrc: e.target.src });
	}

	render() {
		return (
			<div className="App">
				<BrowserRouter>
					<div>
						<Navigator app={this.state} />
						<Content app={this.state} />
						<div className="custom-file imgurUploader" style={{ width: "300px" }}>
							<input type="file" className="custom-file-input" id="inputGroupFile01" aria-describedby="inputGroupFileAddon01" onChange={this.fileSelected} />
							<label className="custom-file-label" htmlFor="inputGroupFile01">{this.state.filename}</label>
						</div>
						<img id="uploadedImage" src={this.state.imgsrc} onLoad={this.imageUploaded} />
					</div>
				</BrowserRouter>
			</div>
		);
	}
}

export default App;
