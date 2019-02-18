import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3001',
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

    static addCont(name, lat, lng, type, level){
        return instance.post('/conts/addcont', {name, lat, lng, type, level})
        .then((res) => res.data.user)
        .catch(ContsAPI.errorHandler)
    }
}