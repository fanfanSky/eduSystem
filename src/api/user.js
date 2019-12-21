/*
 * @Date: 2019-12-18 13:15:58
 * @LastEditTime : 2019-12-21 14:35:46
 * @Author: 江帆
 * @Github: https://github.com/J-Fan-Fan/
 */
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


// 获取用户列表
export function userList(){
    return instance({
        url: "/user/list",
        method:"get",
        headers:{
            token:getToken()
        }
    })

}
// 用户新增
export function userAdd(data){
    return instance({
        url: "/user/add",
        method:'post',
        data,
        headers:{
            token:getToken()
        }
    })
}
//用户状态
export function userStatus(data) {
    return instance({
        url: "/user/status",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}
//删除用户
export function userRemove(data) {
    return instance({
        url: "/user/remove",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}
//删除用户
export function userEdit(data) {
    return instance({
        url: "/user/edit",
        method: 'post',
        data,
        headers: {
            token: getToken()
        }
    })
}

