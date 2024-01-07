import axios from "axios"; 

const prodUrl = "https://realm-dungeon-backend-enc1uqaek-zlvsky.vercel.app/api/";
// const devUrl = "http://127.0.0.1:8080/api/";

const axiosClient = axios.create({
  baseURL: prodUrl,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true,
  },
});

export default axiosClient;