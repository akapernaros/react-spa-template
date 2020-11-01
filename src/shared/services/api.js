import axios from 'axios';

class AxiosApi {
    constructor() {
        console.log("Initializing Backend API");

        this.axios = axios.create({
            baseURL: 'https://gorest.co.in/public-api',
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