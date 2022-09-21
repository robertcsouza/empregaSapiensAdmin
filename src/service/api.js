import axios from "axios";

const api = axios.create({
  // baseURL: "http://api-empregasapiens.ddns.net:3333",
  baseURL: "https://api.empregasapiens.com.br",
});

export default api;