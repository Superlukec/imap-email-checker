import axios from "axios";
import serverSettings from "@/assets/settings";

export const userService = {
    login,
    logout
};

function login(username: string, password: string) {  
    return axios
        .post(serverSettings.serverEndPoint + '/api/authenticate', { 
            username: username, 
            password: password 
        })
        .then((response) => {
            if (response.status == 200) {
                localStorage.setItem('user', JSON.stringify({ username, password }));
                return response.data;
            }
        }).catch(error => {
            console.log(error);
            return false;
        });
}

function logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('user');
}