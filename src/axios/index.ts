import axios from 'axios';

export const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL
});

api.interceptors.request.use(config => {
    config.url =
        config.url +
        '&units=metric' +
        '&appid=' +
        process.env.REACT_APP_API_KEY;
    return config;
});

export const apiCityList = axios.create({
    baseURL: process.env.REACT_APP_API_URL_OLD
});

apiCityList.interceptors.request.use(config => {
    config.url = config.url + '&appid=' + process.env.REACT_APP_API_KEY;
    return config;
});
