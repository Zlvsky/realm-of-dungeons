import axios from "axios"; 

const axiosClient = axios.create({
  baseURL : 'http://127.0.0.1:8080/',
  headers: {
    "Content-Type": "application/json",
  }, 
});

export default axiosClient;