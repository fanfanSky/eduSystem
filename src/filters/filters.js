// 导入Vue
import Vue from 'vue'
// 导入 moment
import moment from "moment";
// 注册全局过滤器
Vue.filter("formatTime", function (time) {
    // 处理日期
    // 参数1 格式
    // .format 传入的是格式 YYYY MM
    return moment(time).format("YYYY😊MM🌙DD☀️");
});
