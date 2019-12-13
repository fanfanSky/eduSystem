// 导入Vue
import Vue from 'vue'
// 导包
import VueRouter from 'vue-router'

// 导入 login 组件
import login from '../views/login.vue' 



// Use一下 注册
Vue.use(VueRouter)
// 创建路由规则
const routes = [
    {
        path:"/login",
        component:login
    }
]
// 创建
const router = new VueRouter({
    routes // routes:routes
})
// 暴露出去
export default router