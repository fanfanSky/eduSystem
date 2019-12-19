// 导入 axios
import axios from "axios";

// 导入 token的工具函数
import {
    getToken
} from "./token.js";

// 统一设置 axios的设置
// axios.defaults 只能设置一个 axios对象
// 如果项目中 可能用到多个 axios 支持创建一个
// 后续的接口调用直接用  instance 即可
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true,
});

// 为instance 添加拦截器
// 添加请求拦截器
instance.interceptors.request.use(
    function (config) {
        // 在发送请求之前 干一些 事情
        // console.log("请求发送之前");
        // console.log(config);
        // 可以添加请求头
        config.headers.token = getToken();
        return config;
    },
    function (error) {
        // 请求错误之后 干一些事情
        return Promise.reject(error);
    }
);

// 添加响应拦截器
instance.interceptors.response.use(
    function (response) {
        // 对响应的数据 干 一些事情
        // console.log("响应数据获取到之后");
        // console.log(response);
        // 这里可以把 data 直接获取到
        // 后面就不用加了
        return response.data;
    },
    function (error) {
        // 当响应错误的时候 干一些事情
        return Promise.reject(error);
    }
);

// 暴露出去
export default instance