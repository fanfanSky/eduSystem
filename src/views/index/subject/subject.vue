<template>
    <div class="subject-container">
    <!-- 头部卡片 -->
    <el-card class="head-card">
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
            <el-form-item label="学科编号">
            <el-input class="short-input" v-model="formInline.rid"></el-input>
            </el-form-item>
            <el-form-item label="学科名称">
            <el-input v-model="formInline.name"></el-input>
            </el-form-item>
            <el-form-item label="创建者">
            <el-input class="short-input" v-model="formInline.username"></el-input>
            </el-form-item>
            <el-form-item label="状态">
            <el-select v-model="formInline.status" placeholder="请选择状态">
                <el-option label="禁用" value="0"></el-option>
                <el-option label="启用" value="1"></el-option>
            </el-select>
            </el-form-item>
            <el-form-item class="btn-form-item">
            <el-button type="primary" @click="getData">搜索</el-button>
            <el-button @click="clear">清除</el-button>
            <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增学科</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <!-- 身体卡片 -->
    <el-card class="body-card">
        <el-table :data="tableData" style="width: 100%">
            <el-table-column type="index" label="序号"> </el-table-column>
            <el-table-column prop="rid" label="学科编号"> </el-table-column>
            <el-table-column prop="name" label="学科名称"> </el-table-column>
            <el-table-column prop="short_name" label="简称"> </el-table-column>
            <el-table-column prop="username" label="创建者"> </el-table-column>
            <el-table-column prop="create_time" label="创建日期"> </el-table-column>
            <el-table-column prop="status" label="状态">
            <template slot-scope="scope">
                <span v-if="scope.row.status === 1">启用</span>
                <span class="red" v-else>禁用</span>
            </template>
            </el-table-column>
            <el-table-column label="操作">
            <template slot-scope="scope">
                <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
                <el-button type="text" @click="changeStatus(scope.row)">{{ scope.row.status === 1 ? "禁用" : "启用" }}</el-button>
                <el-button type="text" @click="removeItem(scope.row)">删除</el-button>
            </template>
            </el-table-column>
        </el-table>
        <!-- 分页器 -->
        <el-pagination background
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="page"
            :page-sizes="pageSizes"
            :page-size="limit"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
        >
        </el-pagination>
    </el-card>
    <!-- 新增框 -->
    <addDialog></addDialog>
    <!-- 编辑框框 -->

    </div>
</template>
<script>
//导入组件
import addDialog from "./compenents/addDialog.vue"
//导入接口
import {subjectList} from "../../../api/subject.js"

export default {
    name:"subject",
    //注册组件
    components:{
        addDialog
    },
    data() {
        return {
            //顶部的行内表单
            formInline: { },
            // table的数据
            tableData: [
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
                {
                    date: "2016-05-04",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1517 弄"
                },
                {
                    date: "2016-05-01",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1519 弄"
                },
                {
                    date: "2016-05-03",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1516 弄"
                }
            ],
            //新增对话框的数据
            //是否显示新增对话框
            addFormvisible:false
        };
    },
    created() {
        subjectList().then(res=>{
            window.console.log(res);
        })
    },
}
</script>

<style lang="less">
.subject-container {
    .head-card {
        // 设置按钮的容器尺寸
        .el-form-item__content {
            width: 149px;
        }
        .short-input .el-form-item__content {
            width: 100px;
        }
        .btn-form-item .el-form-item__content {
            width: 100%;
        }
    }

    // 分页
    .el-pagination {
        text-align: center;
        margin-top: 30px;
    }
    .body-card {
        margin-top: 19px;
    }

    // 高亮的span
    span.red {
        color: #ff4b4b;
    }
}
</style>