import axios from 'axios';


const instance = axios.create({
    // baseURL: 'http://localhost:3001',
    baseURL: "https://handlecity.herokuapp.com",
    timeout: 2000,
    withCredentials: true,
});

export class AuthAPI {

    static errorHandler(e) {
        console.error("AUTH API ERROR");
        console.error(e);
        throw e;
    }

    static currentUser() {
        return instance
          .get("/auth/currentUser")
          .then(res => res.data)
          .catch(err => console.log(err));
      }

    static loggedin(){
        return instance.get('/auth/currentuser')
        .then((res) => res.data.user)
        .catch(AuthAPI.errorHandler)
    }

    static login(username, password){
        return instance.post('/auth/logincit',{username, password})
        .then((res) => res.data)
        // .catch(AuthAPI.errorHandler)
    }

    static signup(username, password, type, gender){
        return instance.post('/auth/signup',{username, password, type, gender})
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
        return instance
        .post("/auth/editprofile", {mail, id})
        .then(res => res)
        .catch(AuthAPI.errorHandler);
    }

    static logout(){
        return instance.get('/auth/logout')
        .then((res) => res)
        .catch(AuthAPI.errorHandler)
    }
}