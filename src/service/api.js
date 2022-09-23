import axios from "axios";

const api = axios.create({
  baseURL: "https://api.empregasapiens.com.br",
});

export default api;