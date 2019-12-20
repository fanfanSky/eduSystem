<template>
    <div>
        <!-- 头部卡片 -->
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="企业名称">
                    <el-input class="name" v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label=用户邮箱>
                    <el-input class="email" v-model="formInline.email"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-select class="status" v-model="formInline.status" placeholder="请选择状态">
                        <el-option label="超级管理员" value="1"></el-option>
                        <el-option label="管理员" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary">搜索</el-button>
                    <el-button @click="clear">清除</el-button>
                    <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增用户</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 身体卡片 -->
        <el-card class="body-card">
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" label="序号" width="60"></el-table-column>
                <el-table-column prop="username" label="用户名"></el-table-column>
                <el-table-column prop="phone" label="电话"></el-table-column>
                <el-table-column prop="role_id" label="角色"></el-table-column>
                <el-table-column prop="remark" label="备注"></el-table-column>
                <el-table-column prop="status" label="状态">
                    <template slot-scope="scope">   
                        <span v-if="scope.row.status==1">启用</span>
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
            <el-pagination background class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-sizes="pageSizes"
                :page-size="limit"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination> 
        </el-card>
        <!-- 新增框 -->
        <addDialog></addDialog>

    </div>
</template>

<script>
// 导入组件 新增框
import addDialog from "./components/addDialog.vue";

//导入接口
// import {userList} from "../../../api/user.js"
export default {
    name:"user",
    component:{
        addDialog
    },
    data() {
        return {
            // 顶部的 行内表单
            formInline: {
                // 用户名
                name: "",
                // 邮箱
                email: "",
                // 状态
                status: ""
            },
            // table的数据
            tableData:[
                {
                    data:"2019-12-31",
                    name:"江小帆",
                    address:"广东省深圳市宝安区"
                }
            ],
            // 新增对话框的数据
            //是否显示 新增企业 对话框
            addFormVisible:false,
            //页数据
            //页码
            page:1,
            //每一页多少条
            limit:2,
            //页容量 每页多少条
            pageSizes:[2,4,6,9],
            //总条数
            total:0 //默认先给0
        }
    },
    created() {
        this.getData();
    },
    methods: {
        
        
        
        clear(){
            // for(const key in this.formInline){
            //     //获取每一个属性
            //     this.formInline[key] = ""
            // }
            this.formInline = {};
            //重新获取一下数据
            this.getData();
        },
        getData(){
            //传递需要的参数来获取
            
        }
    },
}
</script>

<style lang="less">
.demo-form-inline {
    el-form-item .name {
        width: 100px;
    }
    .name, .status {
        width: 149px;
    }
    .search, .clear {
        width: 70px;
    }
    .add {
        width: 117px;
    }
    .add i {
        width: 14px;
        height: 14px;
        font-weight: bold;    
    }
}
div {
    .body-card {
        text-align: center;
        margin-top: 19px;
        .sbj_edite {
            border: none;
            background-color: rgba(0, 0, 0, 0);
            color: rgb(64, 158, 255);
            margin-left: 2px;
            padding: 1px 3px 1px 3px;
        }
        .page {
            margin-top: 30px;
        }
        // 高亮的span
        span.red {
            color: #ff4b4b;
        }
        el-pagination .page {
            margin-top: 30px;
        }
    }
}
// 对话框
.el-dialog {
width: 600px;
    .el-dialog__header {
        text-align: center;
        background: linear-gradient(to right, #01c4fa, #1294fa);
        padding-bottom: 20px;
        .el-dialog__title {
        color: white;
        }
    }
    .dialog-footer {
        text-align: center
    }
}
</style>