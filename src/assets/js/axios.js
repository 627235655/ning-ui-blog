import axios from "axios";

// 创建axios实例

const Axios = axios.create({
    // withCredentials: true,
    baseURL: "" // api的base_url
});

Axios.defaults.timeout = 3000;

// request拦截器
Axios.interceptors.request.use(
    config => {
        if (config.method === "post") {
            config.headers["Content-Type"] = "application/json";
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

// response拦截器
Axios.interceptors.response.use(
    response => {
        if (response.status == 200) {
            let res = response.data;
            return res;
        } else {
            return response;
        }
    },
    error => {
        return Promise.reject(error);
    }
);

export default Axios;
