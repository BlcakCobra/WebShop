import axios from "axios";

const BaseUrl = axios.create({
    baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5001/'
});

export const RequestesToServer = {
    RegistrationReq(username: string, password: string, confirmPassword: string) {
        try {
            return BaseUrl.post("/register", { username, password, confirmPassword });
        } catch (error) {
            throw new Error(`Somthing went wrong: ${error}`);
        }
    },
    LoginReq(username:string,password:string){
        try {
            return BaseUrl.post("/login",{username,password})
        } catch (error) {
            throw new Error(`Somthing went wrong: ${error}`);
        }
    }
};