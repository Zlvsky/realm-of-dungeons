import axios from "axios"; 

const prodUrl = "https://realm-dungeon-backend.vercel.app/api/";
// const devUrl = "http://127.0.0.1:8080/api/";

const axiosClient = axios.create({
  baseURL: prodUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosClient;