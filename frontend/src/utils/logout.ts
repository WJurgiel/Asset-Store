import axios from "axios";

export const logout = () => {
    axios.post('http://localhost:3000/api/auth/logout', {}, {withCredentials: true}).then(response => {
        console.log(response);
        console.log('log out');
    }).catch(error => {
        console.log(error);
    })
}