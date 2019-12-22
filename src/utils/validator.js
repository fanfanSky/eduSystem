// 手机号
export const checkPhone = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("手机号不能为空"));
    } else {
        // 判断手机号的格式
        // 正则
        const reg = /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
            callback();
        } else {
            // 不满足 手机号的格式
            callback(new Error("老铁，你的手机号写错了噢"));
        }
    }
};
export const checkEmail = (rule, value, callback) => {
    if (!value) {
        return callback(new Error("邮箱不能为空"));
    } else {
        // 判断手机号的格式
        // 正则
        const reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        // 判断是否符合
        // .test(验证的字符串) 返回的是 true 或者false
        if (reg.test(value) == true) {
            callback();
        } else {
            // 不满足 手机号的格式
            callback(new Error("老铁，你的邮箱号写错了噢"));
        }
    }
};
