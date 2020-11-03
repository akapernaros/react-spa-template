import React from "react";
import { ConfigService } from "./config";
import axios from 'axios';


/**
 * TODO maybe a good entry for this serivce.
class Request {
    constructor(url, onSuccess) {
        this.url = url;
        this.onSuccess = onSuccess;
        this.onError = undefined;
        this.queryParameters = [];
    }
}
*/

/**
 * Use HOC in class components or directly.
 * TODO Authentication
 * TODO Configurable headers
 * TODO Hide axios specific stuff
 * TODO Add the REST
 *
 * @type {{call(): ApiService.axios, init(): Promise<void>, get(*=, *): void, axios: may be undefined}}
 */
export const ApiService = {

    axios: axios.create(),

    /**
     * Method initializes service.
     *
     * @returns {Promise<void>}
     */
    async init() {
        console.log("Initializing Backend API");
        this.axios = axios.create({
            baseURL: ConfigService.configuration.baseUrl,
            timeout: ConfigService.configuration.timeout,
            headers: {'X-SPA-Header': 'react-spa'}
        });
    },

    /**
     * Returns the beneath lying service.
     *
     * @returns {AxiosInstance}
     */
    service() {
        return this.axios;
    },

    /**
     * Convenience method to perform a get request.
     *
     * @param url mandatory.
     * @param callback mandatory.
     */
    get(url, callback) {
        this.axios.get(url).then( res => callback(res.data));
    }
}

/**
 * High order component. Usage for class components. Offer access to api service (this.props.api).
 *
 * @param WrappedComponent mandatory.
 * @returns Wrapper class.
 */
export function withApiService(WrappedComponent) {

    return class extends React.Component {
        constructor(props) {
            super(props);
            this.service = ApiService;
        }

        render() {
            return <WrappedComponent api={this.service} {...this.props} />
        }
    }
}