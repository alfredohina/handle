import axios from 'axios';


const instance = axios.create({
    // baseURL: 'http://localhost:3001',
    baseURL: "https://handlecity.herokuapp.com",
    timeout: 2000,
    withCredentials: true,
});

export class ContsAPI {

    static errorHandler(e) {
        console.error("CONTS API ERROR");
        console.error(e);
        throw e;
    }

    static getCont(){
        return instance.post('/conts/listinit')
        .then((res) => res.data.cont)
        .catch(ContsAPI.errorHandler)
    }

    static getContSearch(type){
        return instance.post('/conts/list', {type})
        .then((res) => res.data.cont)
        .catch(ContsAPI.errorHandler)
    }

    static updateLevel(id, level, user, date){
        return instance.post('/conts/updatelevel', {id, level, user, date})
        .then((res) => res)
        .catch(ContsAPI.errorHandler)
    }
}