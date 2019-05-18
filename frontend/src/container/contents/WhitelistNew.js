import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class WhitelistNew extends Component {
	constructor(props) {
		super(props);
		this.state = {
			info: {
				name: "",
				schoolid: "",
				gmail: "",
				facebook: ""
			},
			submitted: false,
		}
	}

	whiteChange = prop => event => {
		let content = event.target.value;
		this.setState(state => {
			state.info[prop] = content;
			return state;
		});
	};

	submit = () => {
		let allFilled = true;
		Object.keys(this.state.info).forEach(entry => {
			if (!this.state.info[entry]) {
				allFilled = false;
			}
		})
		if (!allFilled) {
			alert("請完整填寫資訊");
		}
		else {
			this.props.app.postAxios("/whitelist/new", this.state.info, data => {
				this.setState({ submitted: true });
			});
		}
	}

	render() {
		return (
			<div>
					{
						!this.props.app.identity ? <p>You are not authorized</p> : 
							this.props.app.identity !== "root" ? <Redirect to="/" /> :
							this.state.submitted ? <Redirect to="/whitelist" /> : 
							<div style={{margin: "30px", marginLeft: "auto", marginRight: "auto", width: "90%", maxWidth: "300px"}}>
								<Paper style={{margin: "auto", width: "90%", padding: "10px 20px"}}>	
									<TextField
										label="姓 名"
										value={this.state.info.name}
										onChange={this.whiteChange('name')}
										margin="normal"
										variant="outlined"
										style={{
											margin: "30px 0 30px 0",
											display: "block",
										}}
										placeholder="臺轉會"
									/>
									<TextField
										label="學 號"
										value={this.state.info.schoolid}
										onChange={this.whiteChange('schoolid')}
										margin="normal"
										variant="outlined"
										style={{
											margin: "30px 0 30px 0",
											display: "block",
										}}
										placeholder="b03902130"
									/>
									<TextField
										label="Gmail"
										value={this.state.info.gmail}
										onChange={this.whiteChange('gmail')}
										margin="normal"
										variant="outlined"
										style={{
											margin: "30px 0 30px 0",
											display: "block",
										}}
										placeholder="leo19941227@gmail.com"
									/>
									<TextField
										label="Facebook URL"
										value={this.state.info.facebook}
										onChange={this.whiteChange('facebook')}
										margin="normal"
										variant="outlined"
										style={{
											margin: "30px 0 30px 0",
											display: "block",
										}}
										placeholder="www.facebook.com/leo19941227"
									/>
								</Paper>
								<button onClick={err => {this.submit();}}>Submit</button>
							</div>
					}
			</div>
		);
	};
}

export default WhitelistNew;
