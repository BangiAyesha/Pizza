import axios from "axios";

export function getMenu() {
    return axios.get(`http://localhost:7000/menu`);
}

export function getUserdetails() {
    return axios.get(`http://localhost:7000/userdetails`);
}

export function getOrderdetails() {
    return axios.get(`http://localhost:7000/orderdetails`);
}

export function postUser(data) {
    return axios.post(`http://localhost:7000/register`, data);
}

export function userLogin(data) {
    return axios.post(`http://localhost:7000/loginusers`, data);
}
