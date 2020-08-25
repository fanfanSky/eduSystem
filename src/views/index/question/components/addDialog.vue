<template>
  <!-- 新增对话框 -->
  <el-dialog @opened="opened" class="add-dialog" fullscreen title="新增题库" :visible.sync="$parent.addFormVisible">
    <el-form ref="addForm" :model="addForm" :rules="addFormRules">
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="addForm.subject" placeholder="请选择学科">
          <el-option v-for="item in $parent.subjectList" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="addForm.step" placeholder="请选择阶段">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="addForm.enterprise" placeholder="请选择企业">
          <el-option
            v-for="item in $parent.enterpriseList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <!-- 将value值 设置为 label的选项 -->
        <el-cascader :props="props" v-model="addForm.city" :options="options"></el-cascader>
      </el-form-item>
      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="addForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <!-- 分割线 -->
      <hr />
      <el-form-item label="试题标题" prop="title"> </el-form-item>
      <div class="title-toolbar"></div>
      <div class="title-content"></div>
      <!-- 选项区域--单选 -->
      <el-form-item v-if="addForm.type == 1" label="单选" prop="single_select_answer">
        <el-radio-group v-model="addForm.single_select_answer">
          <!-- 选项A -->
          <div class="radio-box">
            <el-radio label="A">A</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[0].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="radio-box">
            <el-radio label="B">B</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[1].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="radio-box">
            <el-radio label="C">C</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[2].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="radio-box">
            <el-radio label="D">D</el-radio>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[3].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>
      <!-- 选项区域--多选 -->
      <el-form-item v-else-if="addForm.type == 2" label="多选" prop="multiple_select_answer">
        <el-checkbox-group v-model="addForm.multiple_select_answer">
          <!-- 选项A -->
          <div class="radio-box">
            <el-checkbox label="A">A</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[0].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageAUrl" :src="imageAUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项B -->
          <div class="radio-box">
            <el-checkbox label="B">B</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[1].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleBvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageBUrl" :src="imageBUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项C -->
          <div class="radio-box">
            <el-checkbox label="C">C</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[2].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleCvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageCUrl" :src="imageCUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 选项D -->
          <div class="radio-box">
            <el-checkbox label="D">D</el-checkbox>
            <!-- 输入框 -->
            <el-input v-model="addForm.select_options[3].text"></el-input>
            <!-- 上传组件 -->
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :show-file-list="false"
              :on-success="handleDvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageDUrl" :src="imageDUrl" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>
      <!-- 简答题区域 -->
      <el-form-item v-else label="简答题" prop="short_answer">
        <el-input v-model="addForm.short_answer" type="textarea" :rows="6"></el-input>
      </el-form-item>
      <!-- 视频上传区域 -->
      <el-divider></el-divider>
      <el-form-item label="解析视频">
        <!-- 上传组件 -->
        <el-upload
          :action="uploadUrl"
          :show-file-list="false"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传MP4文件，且不超过2000kb</div>
        </el-upload>
        <video class="preview-video" :src="VideoUrl" v-if="VideoUrl" controls></video>
      </el-form-item>
      <!-- 答案解析 -->
      <el-form-item label="答案解析" prop="answer_analyze"></el-form-item>
      <div class="answer-toolbar"></div>
      <div class="answer-content"></div>
      <!-- 试题备注 -->
      <el-divider></el-divider>
      <el-form-item label="试题备注" prop="remark">
        <el-input v-model="addForm.remark" type="textarea" :rows="2"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.addFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 新增接口
import { questionAdd } from "../../../../api/question.js";
// 导入 省市区数据
import { regionData } from "element-china-area-data";
// 导入 富文本编辑器
import wangeditor from "wangeditor";
export default {
  data() {
    return {
      // 级联选择器的数据
      options: regionData,
      // 级联选择器绑定的 选项
      props: { expandTrigger: "hover", value: "label" },
      // 表单数据
      addForm: {
        // 多选的 答案
        multiple_select_answer: [],
        // 默认显示单选
        type: 1,
        // 选项的数据
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ]
      },
      // 宽度
      formLabelWidth: "80px",
      // 添加表单验证规则
      addFormRules: {
        // 学科 subject,
        subject: [{ required: true, message: "学科不能为空", trigger: "change" }],
        // 阶段 step,
        step: [{ required: true, message: "阶段不能为空", trigger: "change" }],
        // 企业 enterprise,
        enterprise: [{ required: true, message: "企业不能为空", trigger: "change" }],
        // 城市 city,
        city: [{ required: true, message: "城市不能为空", trigger: "change" }],
        // 题型 type,
        type: [{ required: true, message: "题型不能为空", trigger: "change" }],
        // 难度 difficulty,
        difficulty: [{ required: true, message: "难度不能为空", trigger: "change" }],
        // 标题 title,
        title: [{ required: true, message: "标题不能为空", trigger: "change" }],
        // 答案 single_select_answer,
        single_select_answer: [{ required: true, message: "答案不能为空", trigger: "change" }],
        // 解析 answer_analyze,
        answer_analyze: [{ required: true, message: "解析不能为空", trigger: "change" }],
        // 备注 remark,
        remark: [{ required: true, message: "备注不能为空", trigger: "change" }],
        // 多选的 规则 multiple_select_answer
        multiple_select_answer: [{ required: true, message: "多选不能为空", trigger: "change" }],
        // 简答题的 规则 multiple_select_answer
        short_answer: [{ required: true, message: "多选不能为空", trigger: "change" }]
      },
      // 富文本编辑器 标题部分
      titleEditor: undefined,
      // 富文本编辑器 答案解析部分
      answerEditor: undefined,
      // 本地预览地址1
      imageAUrl: "",
      imageBUrl: "",
      imageCUrl: "",
      imageDUrl: "",
      // 文件的上传地址
      uploadUrl: process.env.VUE_APP_BASEURL + "/question/upload",
      // 视频临时地址
      VideoUrl: ""
    };
  },
  // mounted 是第一次加载完毕，但是对话框还在没有加载出来
  mounted() {},
  methods: {
    submitForm() {
      this.$refs.addForm.validate(valid => {
        if (valid) {
          // 对
          questionAdd(this.addForm).then(res => {
            window.console.log(res);
            if (res.code === 201) {
              this.$message.warning("题库编号已经存在了，请重新输入");
            } else if (res.code === 200) {
              this.$message.success("恭喜你，新增成功啦！");
              // 关闭弹框
              this.$parent.addFormVisible = false;
              // 调用父组件的 获取数据方法
              this.$parent.getData();
            }
          });
        } else {
          // 错
          this.$message.error("小老弟，数据不太对哦，检查一下呗！");
          return false;
        }
      });
    },
    opened() {
      if (this.titleEditor === undefined) {
        this.titleEditor = new wangeditor(".title-toolbar", ".title-content");
        // 注册change事件
        this.titleEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          // 设置给 标题
          this.addForm.title = html;
        };
        this.titleEditor.create();
      }
      // 答案解析富文本编辑器 创建
      if (this.answerEditor === undefined) {
        this.answerEditor = new wangeditor(".answer-toolbar", ".answer-content");
        // 注册change事件
        this.answerEditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          // window.console.log(html);
          // 设置给 标题
          this.addForm.answer_analyze = html;
        };
        this.answerEditor.create();
      }
    },
    // 上传组件的钩子
    handleAvatarSuccess(res, file) {
      // window.console.log(res)
      this.imageAUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addForm.select_options[0].image = res.data.url;
    },
    handleBvatarSuccess(res, file) {
      // window.console.log(res)
      this.imageBUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addForm.select_options[1].image = res.data.url;
    },
    handleCvatarSuccess(res, file) {
      // window.console.log(res)
      this.imageCUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addForm.select_options[2].image = res.data.url;
    },
    handleDvatarSuccess(res, file) {
      // window.console.log(res)
      this.imageDUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addForm.select_options[3].image = res.data.url;
    },
    // 验证 的逻辑
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 或 PNG格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    // 视频上传的 成功钩子
    handleVideoSuccess(res, file) {
      // window.console.log(res)
      // 本地临时地址
      this.VideoUrl = URL.createObjectURL(file.raw);
      // 设置给第一个选项的 图片地址
      this.addForm.video = res.data.url;
    },
    // 视频上传判断 的逻辑
    beforeVideoUpload(file) {
      const isJPG = file.type === "video/mp4";
      // 2m
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传视频只能是 MP4格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传视频大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  }
};
</script>

<style lang="less">
.add-dialog {
  // 设置宽度
  .el-dialog {
    width: 602px;
  }
  // 对话框
  .el-dialog__header {
    background: linear-gradient(to right, #01c4fa, #1394fa);
    // 文字
    span {
      color: white;
    }
    i {
      color: white;
    }
  }
  // 设置富文本的边框
  .title-toolbar,
  .answer-toolbar {
    border: 1px solid #c7c7c7;
    border-bottom: none;
  }
  .title-content,
  .answer-content {
    border: 1px solid #c7c7c7;
    height: 100px;
  }
  // 上传组件的样式
  .avatar-uploader {
    margin-left: 20px;
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
  // 表单宽度
  .el-form {
    width: 60%;
    margin: 0 auto;
  }
  .el-radio-group {
    width: 100%;
  }
  .radio-box {
    display: flex;
    align-items: center;
    margin-top: 45px;
    // 小间隙
    .el-checkbox {
      margin-right: 30px;
    }
  }

  .preview-video {
    width: 320px;
  }
}
</style>
