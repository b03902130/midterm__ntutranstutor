import React, { Component } from "react";
import { ProductCard } from "react-ui-cards";

import Axios from 'axios'
Axios.defaults.withCredentials = true

class Teachers extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: undefined
        };
    }

    componentDidMount() {
        this.props.app.getAxios("/teachers", data => {
            console.log(data);
        });
    }

    render() {
        return (
            <div>
                <ProductCard
                    photos={["https://i.imgur.com/jRVDeI8.jpg"]}
                    price='工程科學與海洋學系'
                    productName='Headphones'
                    description='Donec lectus nulla, molestie aliquam nisl vitae, tempor placerat magna. Morbi dignissim in felis vel aliquet.'
                    rating={3}
                    url='https://github.com/nukeop'
                />
            </div>
        );
    };
}

export default Teachers;
