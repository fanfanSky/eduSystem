// 定义token的key
// 用作key的常量 一般会写成全部大写
const KEY = "mmtoken";

// 保存token
export const setToken = (token) => {
    localStorage.setItem(KEY, token)
};
// 获取token
export const getToken = () => {
    // 取值只要 key即可
    return localStorage.getItem(KEY)
};
// 移除token
export const removeToken = () => {
    // 取值只要 key即可
    localStorage.removeItem(KEY)
};