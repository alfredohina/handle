import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 2000,
    withCredentials: true,
});

export class ReportAPI {

    static errorHandler(e) {
        console.error("REPORT API ERROR");
        console.error(e);
        throw e;
    }

    static addReport(user, cont, type, date){
        return instance.post('/conts/addreport', {user, cont, type, date})
        .then((res) => res)
        .catch(ReportAPI.errorHandler)
    }


    static getData(user, date){
        return instance.post('conts/getreports', {user, date})
        .then((res) => res.data.cont)
        .catch(ReportAPI.errorHandler)
    }

}