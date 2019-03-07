import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? "":'http://localhost:3001',
    timeout: 2000,
    withCredentials: true,
});

export class ReportAPI {

    static errorHandler(e) {
        console.error("REPORTS API ERROR");
        console.error(e);
        throw e;
    }

    static getReportsType(type, hour, gender){
        return instance.post('/conts/getreportstype', {type, hour, gender} )
        .then((res) => res.data.cont)
        .catch(ReportAPI.errorHandler)
    }

}