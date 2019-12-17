// 导入 axios
import axios from "axios";

// 统一设置 axios的设置
// axios.defaults 只能设置一个 axios对象
// 如果项目中 可能用到多个 axios 支持创建一个
// 后续的接口调用直接用  instance 即可
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// 暴露接口
export function login(data) {
    return instance({
        url: "/login",
        method: "post",
        data
    });
}

// 暴露接口 短信
export function sendsms(data) {
    return instance({
        url: "/sendsms",
        method: "post",
        data
    });
}

// 暴露接口 注册
export function register(data) {
    return instance({
        url: "/register",
        method: "post",
        data
    });
}
