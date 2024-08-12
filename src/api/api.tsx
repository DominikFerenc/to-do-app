import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:9210/api",
});

export default api;
