// 导入 抽取的 axios的请求对象
import instance from '../utils/request.js'


// 企业 新增
export function enterpriseAdd(data) {
    return instance({
        url: "/enterprise/add",
        method: "post",
        data,

    });
}
// 企业 列表
export function enterpriseList(params) {
    return instance({
        url: "/enterprise/list",
        method: "get",
        params,

    });
}
// 企业 状态
export function enterpriseStatus(data) {
    return instance({
        url: "/enterprise/status",
        method: "post",
        data,

    });
}
// 企业 编辑
export function enterpriseEdit(data) {
    return instance({
        url: "/enterprise/edit",
        method: "post",
        data,

    });
}
// 企业 删除
export function enterpriseRemove(data) {
    return instance({
        url: "/enterprise/remove",
        method: "post",
        data,

    });
}
