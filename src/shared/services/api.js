import React from "react";
import axios from 'axios';
import { ConfigService } from './config';

class AxiosApi {
    constructor() {
        console.log("Initializing Backend API");

        this.axios = axios.create({
            baseURL: ConfigService.getConfiguration().baseUrl,
            timeout: 10000,
            headers: {'X-SPA-Header': 'react-spa'}
        });
    }

    static newInstance = () => {
        return new AxiosApi();
    }

    call = () => this.axios;

    get(url, callback) {
        this.axios.get(url).then( res => callback(res.data));
    }
}

export const Api = AxiosApi.newInstance();

export function withRestApi(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.service = Api;
        }

        render() {
            return <WrappedComponent api={this.service} {...this.props} />
        }
    }
}