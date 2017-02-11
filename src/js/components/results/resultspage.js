'use strict';

import React from 'react';
import axios from 'axios';
import $ from 'jquery';
import apiConfig from '../../config/apiConfig';

const api = apiConfig();


export default class Results extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            results: []
        };
    }

    componentDidMount() {
        axios.get(`${api.url}?${$.param({
            'api-key': api.key,
            'query': this.props.query
        })}`)
            .then(res => {
                const results = res.data.results.map(obj => obj);
                this.setState({results: results});
            });
    }

    render() {
        return (
            <ul>
                {this.state.results.map((result, index) =>
                    <li key={index}>{result.display_title}</li>
                )}
            </ul>
        );
    }
}