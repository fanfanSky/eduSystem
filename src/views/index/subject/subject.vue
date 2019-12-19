<template>
    <div>
        <!-- 头部卡片 -->
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="学科编号">
                    <el-input class="number_1" v-model="formInline.rid"></el-input>
                </el-form-item>
                <el-form-item label="学科名称">
                    <el-input class="name" v-model="formInline.name"></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                    <el-input class="establish" v-model="formInline.username"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select class="status" v-model="formInline.status" placeholder="请选择状态">
                        <el-option label="启用" value="1"></el-option>
                        <el-option label="禁用" value="0"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" >搜索</el-button>
                    <el-button >清除</el-button>
                    <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增学科</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 身体卡片 -->
        <el-card class="body-card">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="rid" label="学科编号" ></el-table-column>
                <el-table-column prop="name" label="学科名称" ></el-table-column>
                <el-table-column prop="short_name" label="简称" ></el-table-column>
                <el-table-column prop="username" label="创建者" width="150"></el-table-column>
                <el-table-column prop="create_time" label="创建日期" ></el-table-column>
                <el-table-column prop="status" label="状态" >
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
            <el-pagination background class="page"
                :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </el-card>
        <!-- 新增框 -->
        <addDialog></addDialog>

    </div>
</template>

<script>
// 导入组件 新增框
import addDialog from "./compenents/addDialog.vue";
import { subjectList } from '../../../api/subject';

// 导入接口
// import { subjectList, subjectRemove,subjectStatus } from "../../../api/subject.js";

export default {
    name:"subject",
    // 注册组件
    components: {
        addDialog,
    },
    data() {
        return {
            // 顶部的 行内表单
            formInline: {
                // 学科id
                rid: "",
                // 状态
                status: "",
                // 学科名称
                name: "",
                // 创建者
                username: ""
            },
            tableData: [
                // table的数据
                {
                    date: "2016-05-02",
                    name: "王小虎",
                    address: "上海市普陀区金沙江路 1518 弄"
                },
            ],
            // 新增对话框的数据
            // 是否显示新增对话框
            addFormVisible:false,
            //页数据
            //页码
            page:1,
            //每一页多少条
            limit:6,

        }
    },
    created() {
        this.getData();
    },
    methods: {
        getData(){
            // 传递一个参数
            subjectList({
                page:this.page,
                limit:this.limit
            }).then(res=>{
                window.console.log(res);
                //保存表格数据
                this.tableData = res.data.items
            })
            

        }
    },
}
</script>

<style lang="less">
    .demo-form-inline {
        .number_1, .establish {
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
                margin-bottom: 10px;
                margin-top: 26px;
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