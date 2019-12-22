//导入 抽取的axios请求对象
import instance from "../utils/request.js";

// 获取用户列表
export function userList(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params
    })

}
// 用户新增
export function userAdd(data) {
    return instance({
        url: "/user/add",
        method: 'post',
        data,
    })
}
//用户状态
export function userStatus(data) {
    return instance({
        url: "/user/status",
        method: 'post',
        data,
    })
}
//删除用户
export function userRemove(data) {
    return instance({
        url: "/user/remove",
        method: 'post',
        data,
    })
}
//编辑用户
export function userEdit(data) {
    return instance({
        url: "/user/edit",
        method: 'post',
        data,
    })
}