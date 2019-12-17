/*
 * @Author: your name
 * @Date: 2019-12-17 17:22:47
 * @LastEditTime: 2019-12-17 17:43:34
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \day04\heimamm\src\router\router.js
 */
// 导入Vue
import Vue from 'vue'
// 导包
import VueRouter from 'vue-router'

// 导入 登录 组件
import login from '../views/login/login.vue' 
// 导入 首页 组件
import index from '../views/index/index.vue'
// 导入 学科 组件
import subject from '../views/index/subject/subject.vue'
// 导入 用户 组件
import user from '../views/index/user/user.vue'
// 导入 统一数据 组件
import chart from '../views/index/chart/chart.vue'
// 导入 题库 组件
import question from '../views/index/question/question.vue'
// 导入 企业 组件
import enterprise from '../views/index/enterprise/enterprise.vue'

// Use一下 注册
Vue.use(VueRouter)
// 规则(创建路由对象)
const routes = [
    {
        path:"/login",
        component:login
    },
    {
        path: "/index",
        component: index,
        children:[
            {
                path: "subject",
                component: subject
            },
            {
                path: "user",
                component: user 
            },
            {
                path: "chart",
                component: chart
            },
            {
                path: "question",
                component: question
            },
            {
                path: "enterprise",
                component: enterprise
            }
        ]
    },
    
];
// 创建
const router = new VueRouter({
    routes // routes:routes
})
// 把路由对象暴露出去
export default router