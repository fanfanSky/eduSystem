<template>
  <div class="login-box">
    <!-- 表单容器 -->
    <div class="form-box">
      <!-- 标题 -->
      <div class="title-box">
        <img src="../../assets/login-logo.png" alt="" />
        <span class="title">黑马面面</span>
        <i></i>
        <span class="sub-title">用户登录</span>
      </div>
      <!-- 饿了么的 表单 -->    
      <el-form :rules="rules" class="login-form" ref="form" :model="form"> <!--规则  :rules="rules"-->
        <!-- 手机号 -->
        <el-form-item prop="phone">  <!--属性名   prop="phone"-->
          <el-input
            placeholder="请输入手机号"
            v-model="form.phone"         
            prefix-icon="el-icon-user"
          ></el-input>               <!--数据绑定  v-model="form.phone"-->
        </el-form-item>
        <!-- 密码 -->
        <el-form-item prop="password">    <!--属性名   prop="password"-->
          <el-input
            placeholder="请输入密码"
            v-model="form.password"
            show-password
            prefix-icon="el-icon-lock"
          ></el-input>                    <!--数据绑定  v-model="form.password"-->
        </el-form-item>
        <!-- 验证码 -->
        <el-form-item prop="captcha">     <!--属性名   prop="captcha"-->
          <!-- 行 -->
          <el-row>
            <!-- 列 -->
            <el-col :span="18">
              <el-input
                placeholder="请输入验证码"
                v-model="form.captcha"
                prefix-icon="el-icon-key"
              ></el-input>                <!--数据绑定  v-model="form.captcha"-->
            </el-col>
            <el-col :span="6">
              <!-- 验证码图片 -->
              <img class="captcha" @click="changeCaptcha" :src="captchaURL" alt="" />
            </el-col>
          </el-row>
        </el-form-item>
        <!-- 用户协议 -->
        <el-form-item>
          <el-checkbox v-model="form.checked">
            我已阅读并同意 <el-link type="primary">用户协议</el-link> 和<el-link
              type="primary"
              >隐私条款</el-link
            >
          </el-checkbox>
        </el-form-item>
        <!-- 按钮区域 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm">登录</el-button>
          <el-button @click="dialogFormVisible = true" class="register-button" type="success">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img class="login-pic" src="../../assets/login_banner_ele.png" alt="" />
    <!-- 注册的对话框 -->
    <el-dialog title="收货地址" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <!-- 头像上传 -->
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"  
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="昵称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="手机" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图形码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16">
              <el-input v-model="form.name" autocomplete="off"></el-input>
            </el-col>
            <el-col :offset="1" :span="7">
              <!--注册页验证码图片-->
              <img
                class="register-captcha"
                src="../../assets/captcha.jpg"
                alt=""
              />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item label="验证码" :label-width="formLabelWidth">
          <el-row>
            <el-col :span="16"
              ><el-input v-model="form.name" autocomplete="off"></el-input
            ></el-col>
            <el-col :span="7" :offset="1">
              <el-button>获取用户验证码</el-button>
            </el-col>
          </el-row>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "login",
  data() {
    // 自定义校验规则的函数
    // 手机号
    var checkPhone = (rule, value, callback) => {    //验证的函数
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

    return {    //绑定的数据
      // 表单的数据
      form: {
        phone: "",     
        password: "",
        captcha: "",
        // 是否勾选
        checked: false
      },
      // 定义校验规则
      rules: {
        phone: [{ required: true, validator: checkPhone, trigger: "blur" }],
        password: [
          {
            required: true,
            message: "密码不能为空",
            trigger: "change"
          },
          {
            min: 6,
            max: 18,
            message: "密码长度为 6 到 18",
            trigger: "change"
          }
        ],
        captcha: [
          {
            required: true,
            message: "验证码不能为空",
            trigger: "change"
          },
          {
            min: 4,
            max: 4,
            message: "验证码长度为4",
            trigger: "change"
          }
        ]
      },
      // 验证码地址
      captchaURL : process.env.VUE_APP_BASEURL + "/captcha?type=login",
      // 是否显示对话框
      dialogFormVisible: false,
      // 宽度
      formLabelWidth: "60px",
      // 上传地址
      imageUrl: ""
    };
  },
  methods: {
    // 表单验证方法
    submitForm() {
      if(this.form.checked===false){   //没有勾选
          // 没勾，提示
          this.$message.warning("老铁，没勾哦，先勾一下呗！")
      }else{     //勾选了
        this.$refs.form.validate(valid => {  
          if (valid) {
            // 验证成功
            // this.$message.success("恭喜你，成功啦");
            // 调用接口
            axios({
                url:process.env.VUE_APP_BASEURL+'/login',
                method:"post",
                // 设置跨域请求可以携带cookie  默认为false
                withCredentials:true,
                data:{
                  phone:this.form.phone,
                  password:this.form.password,
                  code:this.form.captcha
                }
            }).then(res=>{
              window.console.log(res);
            })
          } else {
            // 验证失败
            this.$message.error("很遗憾，内容没有写对！");

            return false;
          }
      });
      }
    },
    // 重新获取验证码
    changeCaptcha() {
      // this.captchaURL =
        // process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Math.random(); // 随机数
      // 从1970年1月1日至今的毫秒数
      this.captchaURL =
        process.env.VUE_APP_BASEURL + "/captcha?type=login&" + Date.now(); // 时间戳      
      // this.captchaURL =
      //   process.env.VUE_APP_BASEURL + "/captcha?type=login"; // 时间戳
    },
    // 上传的方法
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }

  }
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
    .title-box {
      display: flex;
      align-items: center;
      img {
        // emmet语法
        // w22+h17+mr16
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }
      .title {
        font-size: 24px;
        margin-right: 14px;
      }
      i {
        width: 1px;
        height: 28px;
        background-color: #c7c7c7;
        margin-right: 12px;
      }
      .sub-title {
        font-size: 22px;
      }
    }
    // 表单盒子
    .login-form {
      margin-top: 27px;
      // 验证码
      .captcha {
        height: 40px;
        width: 100%;
      }
      // checkbox的样式
      .el-checkbox {
        display: flex;
        align-items: center;
        .el-checkbox__label {
          display: flex;
          align-items: center;
        }
      }
      // 按钮的样式
      .el-button {
        width: 100%;
        margin: 0;
      }
      .register-button {
        margin-top: 26px;
      }
    }
  }

  // 对话框
  .el-dialog {
    width: 603px;
    .el-dialog__header {
      text-align: center;
      background: linear-gradient(to right, #01c4fa, #1294fa);
      padding-bottom: 20px;
      .el-dialog__title {
        color: white;
      }
    }
  }
  // 注册验证码
  .register-captcha {
    height: 40px;
    width: 100%;
  }
  // 头像的样式
  // 头像居中
  .avatar-uploader {
    text-align: center;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
</style>