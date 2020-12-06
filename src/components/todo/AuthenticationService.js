import Axios from "axios";

class AuthenticationService {
    executeBasicAuthenticationService(username, password) {
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        console.log(basicAuthHeader)
        return Axios.get('http://localhost:8080/basicauth',
        {headers: {authorization: "Basic amFjazpwdw=="}})
    }

    createBasicAuthToken(username, password) {
        return 'Basic ' + window.btoa(username + ":" + password)
    }

    registerSuccessfulLogin(username, password) {
        let basicAuthHeader = this.createBasicAuthToken(username, password)
        console.log('registerSuccessfulLogin');
        sessionStorage.setItem('authenticatedUser', username)
        this.setupAxiosInterceptors(basicAuthHeader);
    }

    logout() {
        sessionStorage.removeItem('authenticatedUser');
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem('authenticatedUser')
        if (user===null) return false;
        return true;
    }

    getLoggedInUserName() {
        let user = sessionStorage.getItem('authenticatedUser');
        if (user===null) return '';
        return user;
    }

    setupAxiosInterceptors(basicAuthHeader) {
        Axios.interceptors.request.use(
            (config) => {
                if(this.isUserLoggedIn()) {
                    config.headers.authorization = basicAuthHeader
                }
                return config
            }
        )
    }

}

export default new AuthenticationService