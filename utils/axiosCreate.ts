import axios from 'axios';

const axiosCreate = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
});

export default axiosCreate;
