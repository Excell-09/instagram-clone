import axios from 'axios';

const axiosCreate = axios.create({
  baseURL: 'https://instagram-clone-api-junchoi.vercel.app/api/v1',
});

export default axiosCreate;
