import axios from "axios";

function loading(){}


const https = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});


https.interceptors.request.use((config => {
  loading(true);
  config.headers["token"] = localStorage.getItem("token") || "";
  return config;
}), error => {
  return Promise.reject(error);
});

https.interceptors.response.use((response) => {
  return response.data;
}, (error) => {

  if(error.response.status === 401) {
    window.location.href = "/login";
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    return Promise.reject(error);
  }

  if (error.response.status === 403) {
    window.location.href = "/403";
  }

  return Promise.reject(error);
},
()=>{
  loading(false);
});


export default https;