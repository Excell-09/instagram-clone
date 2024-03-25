import axios from "axios";

const AppAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL + "/api",
});

export default AppAxios;