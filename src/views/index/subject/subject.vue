<template>
    <div>
        <!-- 头部卡片 -->
        <el-card class="subject-container">
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
                    <el-button type="primary" @click="getData">搜索</el-button>
                    <el-button @click="clear">清除</el-button>
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
                <el-table-column prop="create_time" label="创建日期" >
                    <template slot-scope="scope">
                        {{scope.row.create_time | formatTime}}
                    </template>
                </el-table-column>
                <el-table-column prop="status" label="状态" >
                    <template slot-scope="scope">   
                        <span v-if="scope.row.status === 1">启用</span>
                        <span class="red" v-else>禁用</span>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showEdit(scope.row)">编辑</el-button>
                        <!-- scope.row 表示的是正行的数据 -->
                        <el-button type="text" @click="changeStatus(scope.row)">{{ scope.row.status === 1 ? "禁用" : "启用" }}</el-button>
                        <el-button type="text" @click="removeItem(scope.row)">删除</el-button>
                    </template>
                </el-table-column>    
            </el-table>
            <!-- 分页器 -->
            <el-pagination class="page"
                background
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
        <!-- 编辑框 -->
        <editDialog ref="editDialog"></editDialog>
    </div>
</template>

<script>
// 导入组件 新增框
import addDialog from "./components/addDialog.vue";
// 导入组件 编辑框
import editDialog from "./components/editDialog.vue";

// 导入接口
import { subjectList,subjectStatus,subjectRemove } from "../../../api/subject.js";

export default {
    name:"subject",
    // 注册组件
    components: {
        addDialog,editDialog
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
            // 是否显示编辑对话框
            editFormVisible:false,
            //页数据
            //页码
            page:1,     //给个默认值
            //每一页多少条
            limit:2,    //给个默认值
            //页容量选项  数组
            pageSizes:[2,4,6,9],
            // 总条数
            total: 0
        }
    },
    created() {
        this.getData();
    },
    methods: {
        // 因为编辑需要带点击当前行的数据进行显示,而新增学科只需要判断是否显示对话框即可(判断布尔值),所以编辑需要写方法
        //进入编辑状态
        showEdit(item){
            //显示对话框
            this.editFormVisible = true;
            // window.console.log(item);
            // 通过ref赋值
            // 复杂类型的赋值,是引用类型的地址
            // JSON.parse(JSON.stringify(item))  属于深拷贝,对function无法拷贝
            this.$refs.editDialog.editForm = JSON.parse(JSON.stringify(item));
        },
        //页码改变
        handleCurrentChange(page){
            // window.console.log(page);
            //保存页码
            this.page = page
            //重新获取数据
            this.getData();
        },
        //页容量改变  回调函数
        handleSizeChange(size){
            // window.console.log(size);
            this.limit = size;
            this.getData();
        },
        // 清空筛选
        clear(){
            //这是一个对象,for...in..遍历
            for(const key in this.formInline){
                //清空对象里面的值
                this.formInline[key] = "";
            }
            //重新获取学科列表的数据
            this.getData();
        },
        //每次添加学科时清除一下下里面的内容
        // addFormVisible(){
        //     for(const key in this.$refs.addForm){
        //         //清空对象里面的值
        //         this.$refs.addForm[key] = "";
        //     }      
        // },
        //删除学科
        removeItem(item){
            this.$confirm(`你真的要删"${item.intro}"吗?`,"友情提示",{
                confirmButtonText: "确定",
                cancelButtonText: "取消",
                type: "warning"
            }).then(()=>{
                //确定要删之后的处理逻辑  
                subjectRemove({   //调用移除接口
                    //需要请求删除的id
                    id:item.id
                }).then(res=>{
                    if(res.code===200){
                        this.$message.success("删除成功!");
                        this.getData();
                    }
                })
            }).catch(()=>{});
        },
        //修改状态
        changeStatus(item){
            subjectStatus({
                id:item.id
            }).then(res=>{
                if(res.code===200){
                    this.$message.success("恭喜!已切换咯...");
                    // OK之后在调用一次学科列表进行页面刷新
                    this.getData();
                }
            })
        }, 
        //获取学科列表数据
        getData(){
            // 传递一个参数
            subjectList({
                page:this.page,
                limit:this.limit,
                ...this.formInline
            }).then(res=>{
                window.console.log(res);
                //保存表格数据
                this.tableData = res.data.items;
                // 保存总条数
                this.total = res.data.pagination.total;
            })
        }
    },
}
</script>

<style lang="less">
.subject-container {
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
}
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
    .sbj_status {
        // 高亮的span
        span.red {
            color: #ff4b4b;
        }
    }
    
    el-pagination .page {
        margin-top: 30px;
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