// 导入 axios
import axios from "axios"; 

// 导入 token的工具函数
import {getToken} from '../utils/token.js'

const instance = axios.create({
    baseURL: process.env.VUE_APP_BASEURL,
    // 跨域携带cookie
    withCredentials: true
});

// 暴露方法 获取学科列表
export function subjectAdd(data) {
    return instance({
        url: "/subject/add",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}