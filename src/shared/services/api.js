import axios from 'axios';

class Api {
    constructor() {
        console.log("Initializing Backend API");

        this.axios = axios.create({
            baseURL: 'https://gorest.co.in/public-api',
            timeout: 10000,
            headers: {'X-SPA-Header': 'react-spa'}
        });
    }

    static newInstance = () => {
        return new Api();
    }

    call = () => this.axios;

    async get(url, callback) {
        await this.axios.get(url).then( res => callback(res.data));
    }
}

export default Api.newInstance();