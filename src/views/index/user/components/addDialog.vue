<template>
    <!-- 新增对话框 -->
    <el-dialog class="add-dialog" center title="新增用户" :visible.sync="$parent.addFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
        <el-form-item label="用户名" prop="username" :label-width="formLabelWidth">
            <el-input v-model="addForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" :label-width="formLabelWidth">
            <el-input v-model="addForm.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone" :label-width="formLabelWidth">
            <el-input v-model="addForm.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="role_id" :label-width="formLabelWidth">
            <el-input v-model="addForm.role_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="状态" :label-width="formLabelWidth">
            <el-input v-model="addForm.status" autocomplete="off"></el-input>
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
import { subjectAdd } from "../../../../api/subject.js";
export default {
    data() {
    return {
        // 表单数据
        addForm: {
            // 编号
            rid: "",
            // 名字
            name: "",
            // 简称
            short_name: "",
            // 简介
            intro: "",
            // 备注
            remark: ""
        },
        // 宽度
        formLabelWidth: "80px",
        // 添加表单验证规则
        addFormRules: {
            rid: [{ required: true, message: "学科编号不能为空", trigger: "blur" }],
            name: [{ required: true, message: "学科名称不能为空", trigger: "blur" }]
        }
        };
    },
    methods: {
        submitForm() {
        this.$refs.addForm.validate(valid => {
            if (valid) {
            // 对
            subjectAdd(this.addForm).then(res => {
                // window.console.log(res);
                if (res.code === 201) {
                this.$message.warning("学科编号已经存在了，请重新输入");
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
}
</style>
