import axios from 'axios';


const instance = axios.create({
    baseURL: 'http://localhost:3001',
    timeout: 2000,
    withCredentials: true,
});

export class ContsAPI {

    static errorHandler(e) {
        console.error("AUTH API ERROR");
        console.error(e);
        throw e;
    }

    static addCont(){
        return instance.get('/auth/currentuser')
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }
}