import React, { Component } from "react";
import { Link } from 'react-router-dom';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Whitelist extends Component {
	constructor(props) {
		super(props)
		this.state = {
			whitelist: []
		}
	}

	componentDidMount() {
		this.props.app.getAxios(`/whitelist`, data => {
			this.setState({whitelist: data.whitelist})
		});
	}

	delete(id) {
		this.props.app.getAxios(`/whitelist/${id}/delete`, data => {
			this.setState(state => {
				let whitelist = state.whitelist.filter(white => white.id !== id)
				state.whitelist = whitelist;
				return state;
			})
		})	
	}

	render() {
		return (
			<div>
					{
						this.props.app.identity !== "root" ? <p>You are not authorized</p> :
							<div>
								<button><Link to="/whitelist/new">add</Link></button>
								{
									this.state.whitelist.map(white => (
										<div style={{margin: "50px"}}>
											<p>{white.name}</p>
											<p>{white.schoolid}</p>
											<p>{white.gmail}</p>
											<p>{white.facebook}</p>
											<button id={white.id} onClick={err => this.delete(err.target.id)}>delete</button>
										</div>
									))
								}		
							</div>
					}
			</div>
		);
	};
}

export default Whitelist;
