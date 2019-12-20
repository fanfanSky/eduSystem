<template>
    <!-- 新增对话框 -->
    <el-dialog class="add-dialog" center title="新增企业" :visible.sync="$parent.addFormVisible">
        <el-form ref="addForm" :model="addForm" :rules="addFormRules">
        <el-form-item label="企业编号" prop="eid" :label-width="formLabelWidth">
            <el-input v-model="addForm.eid" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业名称" prop="name" :label-width="formLabelWidth">
            <el-input v-model="addForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简称" prop="short_name" :label-width="formLabelWidth">
            <el-input v-model="addForm.short_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业简介" prop="intro" :label-width="formLabelWidth">
            <el-input v-model="addForm.intro" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="企业备注" :label-width="formLabelWidth">
            <el-input v-model="addForm.remark" autocomplete="off"></el-input>
        </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="$parent.addFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm">确 定</el-button>
        </div>
    </el-dialog>
</template>

<script>
import {enterpriseAdd} from "../../../../api/enterprise.js"
export default {
    data() {
        return {
            //表单数据
            addForm:{
                // 编号
                eid: "",
                // 名字
                name: "",
                // 简称
                short_name: "",
                // 简介
                intro: "",
                // 备注
                remark: ""
            },
            //宽度
            formLabelWidth:"80px",
            // 添加表单验证规则
            addFormRules: {
                eid: [{ required: true, message: "企业编号不能为空", trigger: "blur" }],
                name: [{ required: true, message: "企业名称不能为空", trigger: "blur" }],
                short_name: [{ required: true, message: "企业简称不能为空", trigger: "blur" }],
                intro: [{ required: true, message: "企业简介不能为空", trigger: "blur" }]
            }
        }
    },
    methods: {
        submitForm() {
        this.$refs.addForm.validate(valid => {
            if (valid) {
            // 对
            enterpriseAdd(this.addForm).then(res => {
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
    },
}
</script>

<style lang="less">
.add_dialog{
    //这是宽度
    width: 602px;
    //对话框
    .el_dailog_header {
        background: linear-gradient(to right, #01c4fa, #1394fa);
        // 文字
        span {
            color: #fff;
        }
        i {
            color: #fff;
        }
    }
}
</style>