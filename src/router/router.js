// 导入Vue
import Vue from "vue";
// 导包
import VueRouter from 'vue-router';

// 导入 登录 组件
import login from '../views/login/login.vue'; 
// 导入 首页 组件
import index from '../views/index/index.vue';
// 导入 学科 组件
import subject from '../views/index/subject/subject.vue';
// 导入 用户 组件
import user from '../views/index/user/user.vue';
// 导入 统一数据 组件
import chart from '../views/index/chart/chart.vue';
// 导入 题库 组件
import question from '../views/index/question/question.vue';
// 导入 企业 组件
import enterprise from '../views/index/enterprise/enterprise.vue';

// 导入 token工具函数
import { getToken, removeToken } from "../utils/token.js";
// 导入 element-ui的 Message
import { Message } from "element-ui";
// 导入 用户信息接口
import { userInfo } from "../api/user.js";
// 导入仓库
import store from "../store/store.js";

// Use一下 注册
Vue.use(VueRouter);
// 规则
const routes = [{
        path: "/login",
        component: login
    },
    // 首页规则
    {
        path: "/index",
        component: index,
        // redirect: '/index/subject',   //重定向到首页的学科页面
        meta:{
            power: ["超级管理员", "管理员", "老师", "学生"]
        },
        children: [
            {
                path: "subject", // /index/subject
                component: subject,
                meta:{
                    //允许访问的角色
                    power: ["超级管理员", "管理员", "老师"]
                }
            },
            {
                path: "user", // /index/user
                component: user,
                meta:{
                    //允许访问的角色
                    power: ["超级管理员", "管理员"]
                }
            },
            {
                path: "chart", // /index/chart
                component: chart,
                meta:{
                    //允许访问的角色
                    power: ["超级管理员", "管理员", "老师"]
                }
            },
            {
                path: "question", // /index/question
                component: question,
                meta:{
                    //允许访问的角色
                    power: ["超级管理员", "管理员", "老师", "学生"]
                }
            },
            {
                path: "enterprise", // /index/enterprise
                component: enterprise,
                meta:{
                    //允许访问的角色
                    power: ["超级管理员", "管理员", "老师"]
                }
            }
        ]
    }
];
// 创建
const router = new VueRouter({
    routes // routes:routes
    // routes:[]
});


// 注册导航守卫
// to去的 路由
// from 来的 路由
// next 下一个
// 创建路由白名单数组
const whitePaths = ["/login"];

router.beforeEach((to, from, next) => {
    // window.console.log(to);
    // 除了login 页面 都需要做登录判断
    // if (to.path != "/login") {
    // true 存在，false 不存在
    // 转为小写
    if (whitePaths.includes(to.path.toLocaleLowerCase()) === false) {
        // 必须要登录才可以访问
        if (!getToken()) {
            // 提示用户
            // window.alert("先登录");
            Message.error("兄弟，请先登录，在访问！！！！");
            // 去登录页
            next("/login");
        } else {
            // 如果有token 继续走
            // next()
            userInfo().then(res => {
                // window.console.log(res);
                // 如果获取成功 保存用户信息
                if (res.data.code === 200) {
                    // token 是对的 放走
                    // window.console.log(store)
                    // store.state.userInfo = res.data.data;
                    // 用户头像 增加基地址
                    // store.state.userInfo.avatar = process.env.VUE_APP_BASEURL + "/" + store.state.userInfo.avatar;
                    
                    //状态判断
                    if(res.data.data.status===0){
                        //禁用状态
                        Message.warning("兄弟，你被封号了，请等待管理员启用你,再访问");
                        // 打回去
                        next("/login");
                    }else {
                        //启用状态
                        // 修改头像地址 基地址拼接上 图片地址
                        res.data.data.avatar = process.env.VUE_APP_BASEURL + "/" + res.data.data.avatar;
                        // commit 提交到仓库中
                        store.commit("changeUserInfo", res.data.data);
                        
                        // 判断当前这个用户是否可以去
                        // window.console.log(to)
                        // window.console.log(res.data.data)
                        // meta 访问的白名单匹配
                        if (to.meta.power.includes(res.data.data.role)) {
                            // 存在
                            next();
                        } else {
                            // 当前的这个用户，的角色 无法访问这个页面
                            Message.warning("你没有访问的权限哦，请联系管理员");
                        }
                    }
                } else if (res.data.code === 206) {
                    // 提示用户
                    Message.warning("小样，就知道会伪造token，滚犊子");
                    // 干掉token
                    removeToken();
                    // 打回登录页
                    next("/login");
                }
            });
        }
    } else {
        // 登录页 直接放过去
        next();
        
    }
});

// 把路由对象暴露出去
export default router;