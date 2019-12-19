<template>
  <!-- 布局容器 -->
  <el-container class="index-container">
    <el-header class="my-header">
      <div class="left">
        <!-- 图标 -->
        <i @click="isCollapse = !isCollapse" class="el-icon-s-fold icon"></i>
        <img class="logo" src="../../assets/index_logo.png" alt="" />
        <span class="title">黑马面面</span>
      </div>
      <div class="right">
        <img class="user-icon" :src="userInfo.avatar" alt="" />
        <span class="user-name">{{userInfo.username}},您好</span>
        <el-button @click="logout" type="primary" size="small">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="auto" class="my-aside">
        <!-- 导航菜单 -->
        <el-menu router :default-active="$route.path" :collapse="isCollapse" class="el-menu-vertical-demo">
          <el-menu-item index="/index/chart">
            <i class="el-icon-pie-chart"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-user"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-edit-outline"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-office-building"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-notebook-2"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <!-- 出口 -->
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
// 导入 token工具函数
import {  removeToken } from "../../utils/token.js";
// 导入 接口 方法
// import { userInfo } from "../../api/user.js";

// 导入接口方法
import { userLogout } from "../../api/user.js";
export default {
  name: "index",
  data() {
    return {
      // 是否折叠
      isCollapse: false,
      // 用户信息
      // userInfo: {}
    };
  },
  // 方法
  methods: {
    logout() {
      // 问问用户
      this.$confirm("你真的要离开我这个网站吗?", "友情提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          // 确定
          userLogout().then(res=>{
            // window.console.log(res)
            if(res.data.code===200){
              // token
              removeToken()
              // 用户信息
              this.$store.state.userInfo = {}
              // 去登录页
              this.$router.push("/login")
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "你是个好人！"
          });
        });
    }
  },
  // 计算属性简化Vuex数据获取
  computed: {
    userInfo(){
      //直接返回仓库的用户数据即可
      return this.$store.state.userInfo;
    }
  },
  // 创建完成之前钩子 迁移到导航守卫中
  // beforeCreate() {
  //   // 不存在
  //   if (!getToken()) {
  //     // 提示用户
  //     this.$message.error("小样，没登录就要来首页，滑稽！");
  //     this.$router.push("/login");
  //   }
  // },
  created() {
    // userInfo().then(res => {
    //   window.console.log(res);
    //   // 如果获取成功 保存用户信息
    //   if (res.data.code === 200) {
    //     // 处理用户头像的地址
    //     res.data.data.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.data.avatar}`;
    //     this.userInfo = res.data.data;
    //   } else if (res.data.code === 206) {
    //     // 提示用户
    //     this.$message.warning("小样，就知道会伪造token，滚犊子");
    //     // 干掉token
    //     removeToken();
    //     // 打回登录页
    //     this.$router.push("/login")
    //   }
    // });
  }
};
</script>

<style lang="less">
.index-container {
  height: 100%;
  .my-header {
    // background-color: skyblue;
    display: flex;
    justify-content: space-between;
    .left {
      display: flex;
      align-items: center;
      .icon {
        font-size: 24px;
        margin-right: 22px;
      }
      .logo {
        width: 33px;
        height: 28px;
        margin-right: 11px;
      }
      .title {
        font-size: 22px;
        color: #49a1ff;
      }
    }
    .right {
      display: flex;
      align-items: center;
      .user-icon {
        border-radius: 50%;
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .user-name {
        font-size: 14px;
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    // background-color: green;
    // 导航样式
    .el-menu-vertical-demo:not(.el-menu--collapse) {
      width: 200px;
      min-height: 400px;
    }
  }
  .my-main {
    background-color: #E8E9EC;
  }
}
</style>
