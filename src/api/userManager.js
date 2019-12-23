// 导入 抽取的 axios的请求对象
import instance from '../utils/request.js'


// 用户 新增
export function userAdd(data) {
    return instance({
        url: "/user/add",
        method: "post",
        data,

    });
}
// 用户 列表
export function userList(params) {
    return instance({
        url: "/user/list",
        method: "get",
        params,
    });
}
// 用户 状态
export function userStatus(data) {
    return instance({
        url: "/user/status",
        method: "post",
        data,
    });
}
// 用户 编辑
export function userEdit(data) {
    return instance({
        url: "/user/edit",
        method: "post",
        data
    });
}
// 用户 删除
export function userRemove(data) {
    return instance({
        url: "/user/remove",
        method: "post",
        data,
    });
}
