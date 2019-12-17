// 导入 axios
import axios from "axios"; 

// 导入 token的工具函数
import {getToken} from '../utils/token.js'

// 统一设置 axios的设置
// axios.defaults 只能设置一个 axios对象
// 如果项目中 可能用到多个 axios 支持创建一个
// 后续的接口调用直接用  instance 即可
const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// 暴露方法 获取用户信息
export function userInfo() {
    return instance({
        // url:"/user/info",
        // url:"/user/info",
        // 接口文档写错了 不用写`/user`
        url: "/info",
        method: 'get',
        headers: {
            token: getToken()
        }
    })
}

// 用户退出
export function userLogout() {
    return instance({
        url: "/logout",
        method: 'get',
        headers: {
            token: getToken()
        }
    })
}