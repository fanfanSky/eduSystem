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

//暴露方法  新增学科
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

// 暴露方法 获取学科列表
export function subjectList(params) {
    return instance({
        url: "/subject/list",
        method: 'get',
        params,
        headers: {
            token: getToken()
        }
    })
}

// 暴露方法 学科状态
export function subjectStatus(data) {
    return instance({
        url: "/subject/status",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}


// 暴露方法 学科编辑
export function subjectEdit(data) {
    return instance({
        url: "/subject/edit",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}

// 暴露方法 学科删除
export function subjectRemove(data) {
    return instance({
        url: "/subject/remove",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}