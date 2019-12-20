<template>
    <div>
        <!-- 头部卡片 -->
        <el-card>
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="企业编号">
                    <el-input class="number_1" v-model="formInline.eid"></el-input>
                </el-form-item>
                <el-form-item label="企业名称">
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
                    <el-button type="primary">搜索</el-button>
                    <el-button @click="clear">清除</el-button>
                    <el-button @click="addFormVisible = true" type="primary" icon="el-icon-plus">新增企业</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <!-- 身体卡片 -->
        <el-card class="body-card">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column type="index" label="序号" width="70"></el-table-column>
                <el-table-column prop="eid" label="企业编号" ></el-table-column>
                <el-table-column prop="name" label="企业名称" ></el-table-column>
                <el-table-column prop="username" label="创建者" width="150"></el-table-column>
                <el-table-column prop="create_time" label="创建日期" ></el-table-column>
                <el-table-column prop="status" label="状态" >
                    <template >   
                        <span >启用</span>
                        <!-- <span class="red" >禁用</span> -->
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template >
                        <el-button type="text" >编辑</el-button>
                        <!-- scope.row 表示的是正行的数据 -->
                        <el-button type="text" >启用</el-button>
                        <el-button type="text" >删除</el-button>
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
///导入组件 新增框 
import addDialog from "./compnents/addDialog.vue"
//导入接口
import {enterpriseList} from "../../../api/enterprise.js"
export default {
    name:"enterprise",
    // 注册组件
    components:{
        addDialog
    },
    data() {
        return {
            // 顶部的 行内表单
            formInline: {
                // 学科id
                eid: "",
                // 状态
                status: "",
                // 学科名称
                name: "",
                // 创建者
                username: ""
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
        //页码改变
        handleCurrentChange(page){
            window.console.log(page);
            //保存页码
            this.page = page;
            // 重新获取数据
            this.getData();
        },
        // 页容量改变 回调函数
        handleSizeChange(size){
            window.console.log(size);
            //保存页容量
            this.limit = size;
            //重新获取数据
            this.getData();
        },
        clear(){
            for(const key in this.formInline){
                //获取每一个属性
                this.formInline[key] = ""
            }
            //重新获取一下数据
            this.getData();
        },
        getData(){
            //传递需要的参数来获取
            enterpriseList({
                page: this.page,
                limit: this.limit,
                //扩展运算符
                ...this.formInline
            }).then(res=>{
                if(res.code ===200){
                    window.console.log(res);
                    //保存请求到的列表数据
                    this.tableData = res.data.items;
                    //保存总条数
                    this.total = res.data.pagination.total;
                }
            });
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