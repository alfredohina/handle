import axios from 'axios';


const instance = axios.create({
    baseURL: process.env.NODE_ENV == "production" ? "":'http://localhost:3001',
    timeout: 2000,
    withCredentials: true,
});

export class AuthAPI {

    static errorHandler(e) {
        console.error("AUTH API ERROR");
        console.error(e);
        throw e;
    }

    static loggedin(){
        return instance.get('/auth/currentuser')
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }

    static login(username, password){
        return instance.post('/auth/login',{username, password})
        .then((res) => res.data)
        // .catch(AuthAPI.errorHandler)
    }

    static signup(username, password, type){
        return instance.post('/auth/signup',{username, password, type})
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }

    static upload(file){
        return instance
        .post("/auth/image", file, {
            headers: { "Content-Type": "multipart/form-data" }
        })
        .then(res => res)
        .catch(AuthAPI.errorHandler);
    }

    static updateuser(mail, id){
        console.log(mail, id)
        return instance
        .post("/auth/editprofile", {mail, id})
        .then(res => res)
        .catch(AuthAPI.errorHandler);
    }

    static logout(username, password){
        return instance.get('/auth/logout')
        .then((res) => res)
        .catch(AuthAPI.errorHandler)
    }
}