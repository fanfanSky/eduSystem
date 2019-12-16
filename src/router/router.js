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