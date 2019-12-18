<template>
    <div>
        <el-card class="box-card">
            <el-form :inline="true" :model="formInline" class="demo-form-inline">
                <el-form-item label="学科编号">
                    <el-input class="number_1" v-model="formInline.user"></el-input>
                </el-form-item>
                <el-form-item label="学科名称">
                    <el-input class="name" v-model="formInline.user"></el-input>
                </el-form-item>
                <el-form-item label="创建者">
                    <el-input class="establish" v-model="formInline.user"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select class="status" v-model="formInline.region" placeholder="请选择状态">
                        <el-option label="西兰花炒蛋" value="shanghai"></el-option>
                        <el-option label="榴莲排骨汤" value="beijing"></el-option>
                        <el-option label="鸡蛋炒肉" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button class="search" type="primary">搜索</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="clear">清除</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button class="add" type="primary">
                        <i>+</i>
                        新增学科
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <el-card class="box-card_2">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column class="serial" prop="serial" label="序号" width="70"></el-table-column>
                <el-table-column class="sbj_num" prop="sbj_num" label="学科编号" width="140"></el-table-column>
                <el-table-column class="sbj_name" prop="sbj_name" label="学科名称" width="140"></el-table-column>
                <el-table-column class="sbj_simpleName" prop="sbj_simpleName" label="简称" width="140"></el-table-column>
                <el-table-column class="sbj_establish" prop="sbj_establish" label="创建者" width="150"></el-table-column>
                <el-table-column class="sbj_time" prop="sbj_time" label="创建日期" width="140"></el-table-column>
                <el-table-column class="sbj_status" prop="sbj_status" label="状态" width="140"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button class="edite" size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button class="edite" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">禁用</el-button>
                        <el-button class="edite" size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination background class="page"
                :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            formInline: {
                
            },
            tableData: [{
                serial: '1',
                sbj_num: 'QD001',
                sbj_name: '前端与移动开发',
                sbj_simpleName:'前端',
                sbj_establish:'尤雨溪',
                sbj_time:'2019-12-20',
                sbj_status:'启用'
            }, {
                serial: '2',
                sbj_num: 'QD001',
                sbj_name: 'Python开发',
                sbj_simpleName:'后端',
                sbj_establish:'萨拉卡通',
                sbj_time:'2019-12-20',
                sbj_status:'启用'
            }, {
                serial: '3',
                sbj_num: 'QD001',
                sbj_name: 'Java开发',
                sbj_simpleName:'后端',
                sbj_establish:'萨拉卡通',
                sbj_time:'2019-12-20',
                sbj_status:'启用'
            }, {
                serial: '4',
                sbj_num: 'QD001',
                sbj_name: '.NET开发',
                sbj_simpleName:'后端',
                sbj_establish:'萨拉卡通',
                sbj_time:'2019-12-20',
                sbj_status:'禁用'
            }]
        }
    },
    methods: {

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
        .box-card_2 {
            text-align: center;
            margin-top: 19px;
            .edite {
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
    
</style>