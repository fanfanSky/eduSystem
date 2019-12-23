<template>
  <!-- 编辑对话框 -->
  <el-dialog class="edit-dialog" center title="修改用户" :visible.sync="$parent.editFormVisible">
    <el-form ref="editForm" :model="editForm" :rules="editFormRules">
      <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
        <el-input v-model="editForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
        <el-input v-model="editForm.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
        <el-input v-model="editForm.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
        <el-select v-model="editForm.role_id" placeholder="">
          <el-option :value="2" label="管理员"></el-option>
          <el-option :value="3" label="老师"></el-option>
          <el-option :value="4" label="学生"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="状态" :label-width="formLabelWidth">
        <el-select v-model="editForm.status" placeholder="">
          <el-option :value="1" label="启用"></el-option>
          <el-option :value="0" label="禁用"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="用户备注" :label-width="formLabelWidth">
        <el-input v-model="editForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="$parent.editFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// 导入 编辑接口
import { userEdit } from "../../../../api/userManager.js";
// 导入验证函数
import {checkEmail,checkPhone} from '../../../../utils/validator.js'
export default {
  data() {
    return {
      // 表单数据
      editForm: {},
      // 宽度
      formLabelWidth: "80px",
      // 添加表单验证规则
      editFormRules: {
        username: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        email: [
          { required: true, message: "邮箱不能为空", trigger: "blur" },
          { validator: checkEmail, trigger: "blur" }
        ],
        phone: [
          { required: true, message: "电话不能为空", trigger: "blur" },
          { validator: checkPhone, trigger: "blur" }
        ],
        role_id: [{ required: true, message: "角色不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          // 对
          userEdit(this.editForm).then(res => {
            // window.console.log(res);
            if (res.code === 201) {
              this.$message.warning(res.message);
            } else if (res.code === 200) {
              this.$message.success("恭喜你，修改成功啦！");
              // 关闭弹框
              this.$parent.editFormVisible = false;
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
    }
  }
};
</script>

<style lang="less">
.edit-dialog {
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
}
</style>
