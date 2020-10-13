import axios from 'axios';

// 创建 axios 实例
const Axios = axios.create({
	// withCredentials: true,
	baseURL: '', // api的base_url
});

// 设置请求超时时间
Axios.defaults.timeout = 10000;

// request 拦截器
Axios.interceptors.request.use(
	(config) => {
		console.log('Axios.interceptors.request', config);
		if (config.method === 'post') {
			config.headers['Content-Type'] = 'application/json';
		}
		return config;
	},
	(error) => {
		Promise.reject(error);
	}
);

// response 拦截器
Axios.interceptors.response.use(
	(response) => {
		if (response.status == 200) {
			let res = response.data;
			return res;
		} else {
			return response;
		}
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default Axios;

export const post = (url, data) =>
	Axios.post(url, data)
		.then((res) => res)
		.catch((err) => err);

export const get = (url, data) =>
	Axios.get(url, { params: data })
		.then((res) => res)
		.catch((err) => err);
