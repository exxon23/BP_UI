import axios from 'axios';

const raspberryIP = 'http://192.168.1.4:5000';
const instance =  axios.create({
    baseURL: raspberryIP
});

export default instance;