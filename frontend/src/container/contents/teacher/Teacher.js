import React, { Component } from "react";
import roots from '../../../root';

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teacher extends Component {
    componentDidMount() {
    }

    render() {
        return (
            <div>
                {
                    roots.includes(this.props.app.googleid) && <button onClick={err => {
                        this.props.app.postAxios("/alias", { teacherid: this.props.match.params.id }, data => {
                            this.props.app.changeTeacherId(this.props.match.params.id);
                        });
                    }}>轉換教師身分</button>
                }
            </div>
        );
    };
}

export default Teacher;
