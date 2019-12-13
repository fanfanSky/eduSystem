<template>
  <div class="login-box">
    <!-- 表单容器 -->
    <div class="form-box">
      <!-- 标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt="">
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 表单 -->
      <el-form class="login-form" ref="form" :model="form">
        <!-- 手机号 -->
        <el-form-item>
          <el-input placeholder="请输入手机号" prefix-icon="el-icon-user" v-model="form.name"></el-input>
        </el-form-item>
        <!-- 密码 -->
        <el-form-item>
          <el-input  placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="form.name"></el-input>
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item>
          <!-- 行 -->
          <el-col :span="18">
            <el-input placeholder="请输入验证码" prefix-icon="el-icon-key" v-model="form.name"></el-input>
          </el-col>
          <el-col :span="6">
            <img class="captcha" src="../../assets/captcha.jpg" alt="">
          </el-col>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意 <el-link type="primary">用户协议</el-link> 和<el-link type="primary">隐私条款</el-link> 
          </el-checkbox>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary">登录</el-button>
          <el-button class="register-button" type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt="" />
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
    }
  },
};
</script>

<style lang="less">
.login-box {
  /* 开启弹性布局 */
  display: flex;
  /* 上下居中 */
  align-items: center;
  /* 左右 均分 */
  justify-content: space-around;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  height: 100%;
  .form-box {
    width: 478px;
    height: 550px;
    background-color: #f5f5f5;
    padding: 44px;
    box-sizing: border-box;
    // 标题
    .title-box{
      display: flex;
      align-items: center;
      img{
        // emmet语法
        // w22+h17+mr16
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title{
        font-size: 24px;
        margin-right: 14px;
      }
      i{
        width: 1px;
        height: 28px;
        background-color: #C7C7C7;
        margin-right: 12px;
      }
      .sub-title{
        font-size: 22px;
      }
    }
    //表单盒子
    .login-form{
      margin-top: 27px;
      // 验证码
      .captcha{
        width: 100%;
        height: 40px;
      }
      // checkbox的样式
      .el-checkbox{
        display: flex;
        align-items: center;
        .el-checkbox__label{
          display: flex;
          align-items: center;
        }
      }
      // 按钮的样式
      .el-button{
        width: 100%;
        margin: 0;
      }
      .register-button{
        margin-top: 26px;
      }
    }
  }
  
}
</style>
