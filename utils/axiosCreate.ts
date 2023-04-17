import axios from 'axios';

const axiosCreate = axios.create({
  baseURL: process.env.BACKEND_URL,
});

export default axiosCreate;
